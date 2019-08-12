import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import { NgMetaService } from 'ngmeta';
import { ProjectService } from 'src/app/services/project.service';
import { EllipsisPipe } from 'src/app/ellipsis.pipe';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'codebase-page-component',
  templateUrl: './codebase-page.component.html',
  styleUrls: ['./codebase-page.component.scss', ]
})
/**
 * ZipComponent is Reponsible for Unzipping and Rendering a file.zip
 *
 * If stream is unresovable error when ng serve and attempt to render
 * then in tsconfig.json (not.app.json or tsoncif.spec.json. the top level tsconfig.json)
 * add the following code path to the file compileroptions
 * Do not manually go and change in node modules JSzip to readable-stream from stream
 * Git push ignores app modules but not tsconfig.json
 *
 * "paths": {
       "jszip": [
         "node_modules/jszip/dist/jszip.min.js"
       ]
     },
 * @author Andrew Mitchem (1810-Oct08-Java-USF)
 */
export class CodebasePageComponent implements OnInit {
  RenderFile: RenderFile[] = [];
  SelectedFile: RenderFile;
  blobBody: Blob;
  project: Project;
  OpenFile: RenderFile[] = [];
  filepath = '';
  browserSupported = true;
  availableUrls: string [] = [];
  title = '';

  currLevel: DirectoryObject[]; // The current directory
  currLevelDirs: DirectoryObject[]; // Current level directories
  currLevelFiles: DirectoryObject[]; // Current level files

  goodTypes: string[] = ['.prefs',  '.xml',   '.java',  '.properties',
                              '.css',   '.scss',  '.sass',  '.cs',
                              '.html',   '.htm',   '.js',    '.ts',
                              '.py',     '.log'];

  dirSchema: DirectoryObject[];

  /**
   * Constructur: Injects Http Client into the component for use of resource request
   * @param HttpClient standard angular dependency to fire http request.
   * @param Location: Allows the page to redirect back to the last page it was opened from
   * @param Router: Allows for redirection to login if the user has not yet logged in
   * @param NgMetaService: Changes the value of <title> inside index.html
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  constructor(private http: HttpClient,
              private location: Location,
              private ngmeta: NgMetaService,
              private projectService: ProjectService,
              private router: Router) { }

  ngOnInit() {
    // if (localStorage.getItem('user') === null) { // TODO - Undo this.  Just a hack for working.
    if (false) {
      this.router.navigate(['/auth/login']);
    } else {
      this.ngmeta.setHead({ title: 'Code | RPM' });
      this.SelectedFile = this.downloadWaitFile();
      let isTextDecoderSupported = false;
      try {
        isTextDecoderSupported  = !!new TextDecoder('utf-8');
      } catch (e) {
      }
      this.projectService.CurrentProject$.asObservable().subscribe(
        proj => {
          if (proj) {
            this.project = proj;
          }
        });
        
        // TODO - Undo this.  Just a hack for working.
        this.project = {zipURL: 'words'};
        if (this.project) {
          // TODO - Undo this.  Just a hack for working.
        this.project.zipURL = 'https://ms84103newbucket.s3.amazonaws.com/msTRMS.zip';
        if (this.project.zipURL) {
          this.SelectedFile = this.downloadWaitFile();
          this.browserSupported = isTextDecoderSupported;
          this.sendRequest(this.project.zipURL);
        }
      } else {
        this.SelectedFile = this.noZipApologyFile();
      }
    }
    this.dirSchema = [];
  }
  
  /**
   * errorFile()
   * sets the defualt display for error messages
   * @param message: Error message
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  errorFile(message: string): RenderFile {
    const testfile = new  RenderFile();
    testfile.name = 'HELP';
    testfile.content = `ERROR:${message}`;
    return testfile;
  }
  
  /**
   * downloadWaitFile()
   * sets the defualt display message while the .zip file downloads
   * @author Andrew Mitchem (1810-Oct08-Java-USF) | Mike James (1906-Java)
   */
  downloadWaitFile(): RenderFile {
    const waitingFile = new  RenderFile();
    waitingFile.name = 'Setup';
    waitingFile.content = `Thank you for your patience while the .zip file downloads from the project repository.\n
      Please select a file to the left to continue.`;

    return waitingFile;
  }
  
  /**
   * noZipApologyFile()
   * Displays when there is no .zip file attached to the project
   * @author Mike James (1906-Java) 
   */
  noZipApologyFile(): RenderFile {
    const apologyFile = new  RenderFile();
    
    apologyFile.name = 'Apology';
    apologyFile.content = `We're sorry, this project doesn't have a .zip file attached to it.`;
    
    return apologyFile;
  }
  
  /**
   * Zip.goBack()
   * Redirects back to the last page
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  goBack() {
    this.location.back();
  }
  
  /**
   * Zip.sendRequest()
   * Fire off an http request to retrieve the zip file
   * @author Andrew Mitchem (1810-Oct08-Java-USF) | Mike James (1906-Java)
   */
  sendRequest(url: string) {
    // reponse type is arraybuffer so the get request knows this is a oclet-array-stream request
    this.http.get(url, { observe: 'response', responseType: 'blob'})
    .subscribe(blob => {
      // after the array is retrieve. open the data with JSZip
      if (blob.headers.get('content-disposition')) {
        const datafilename = this.getFileNameFromHttpResponse(blob.headers.get('content-disposition'));
        this.blobBody = blob.body;
        this.openData(datafilename);
      } else {
        const datafilename = url.substring(url.lastIndexOf('/') + 1);
        this.blobBody = blob.body;
        this.openData(datafilename);
      }
    }, error => {
      this.SelectedFile = this.errorFile(`The file you have requested cannot be located.`); // This was the sum of my contribution -- Mike
    });
  }
  
  /**
   * Zip.getFileNameFromHttpResponse()
   * splits content-dispotion header ; attachmenent file=filename.ext into file name
   * from stack overflow
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  getFileNameFromHttpResponse(contentDispositionHeader) {
    const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  /**
   * Zip.openData()
   * unpacks a zip blob(ui8array) and opens with JSZip (zip is the reference variable)
   * @param ui8array blob object that "is" a valid zip file.
   * @param datafilename, optional. passed in file name.
   * @author Andrew Mitchem (1810-Oct08-Java-USF) | Mike James (1906-Java-USF)
   */
  openData(datafilename?: string): void {
    let zipDir: JSZip = new JSZip();

    const dataname: string = this.extractDataname(this.blobBody, datafilename);

    zipDir.loadAsync(this.blobBody).then( contents => {
      // Checks if the zip contains a directory matching dataname, changes to that directory
      zipDir = this.setRootFolder(dataname, zipDir);

      if (!zipDir) {
        return; // If no such folder, return.
      }

      let fileArray = zipDir.file(/^.*/); // get the array of all files in this subdirectory

      fileArray = this.filterFiles(fileArray);

      // Build Directory Structure
      for (let i = 0; i < fileArray.length; i++) {
        this.addToDirStructure(fileArray[i].name);
      }

      // We assume that the root directory is a directory...
      this.displayDirectory(this.dirSchema[0].contents as DirectoryObject[]); 
    });
  }

  /**
   * Pushes the selected file to the code window.
   * @param fileName - The path of the selected file.
   * @author Andrew Mitchem (1810-Oct08-Java-USF) | Mike James (1906-Java)
   */
  openFileInCodeWindow(fileName: string): void {
    const zipDir: JSZip = new JSZip();

    zipDir.loadAsync(this.blobBody).then( contents => {
      // Checks if the zip contains a directory matching dataname, changes to that directory
      const file = zipDir.file(fileName);

      const fileData = file.async('uint8array').then(function (data) { // converts the ZipObject
        let fileContent = 'Placeholder Text \n we are sorry your browser may not be supported';
        fileContent = new TextDecoder('utf-8').decode(data);
        return fileContent;
      });

      fileData.then(fileContent => {
        const renderFile = new RenderFile();
        renderFile.name = file.name;
        renderFile.content = fileContent;
        this.SelectedFile = renderFile;
      });
    });
  }

  private filterFiles(filesArray: any[]) {

    const retArray: any[] = [];

    for (let i = 0; i < filesArray.length; i++) {
     {
       if (filesArray[i].name !== undefined){
         const fileType = filesArray[i].name.substring(filesArray[i].name.lastIndexOf('.'));

         if (this.goodTypes.includes(fileType)) {
           retArray.push(filesArray[i]);
         }
       }
      }
    }

    return retArray;
  }

  displayDirectory(directory: DirectoryObject[]): void {

    this.currLevel = directory;
    this.currLevelDirs = [];
    this.currLevelFiles = [];

    for (let i = 0; i < directory.length; i++) {
      const currValue: DirectoryObject = directory[i];
      const currContents: string | DirectoryObject[] = currValue.contents;
      const currName: string = currValue.name;

      if (typeof(currContents) === 'string') {
        this.currLevelFiles.push(currValue);
      } else {
        this.currLevelDirs.push(currValue);
      }
    }

      this.currLevelDirs.sort(this.caseInsensitiveSort_DirectoryObject);
      this.currLevelFiles.sort(this.caseInsensitiveSort_DirectoryObject);
  }

  /**
   * Helper Method: 
   * Sorts DirectoryObjects by name in a case-insensative manner.
   * Source: https://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-in-javascript
   * @param a A DirectoryObject
   * @param b Another DirectoryObject
   */
  private caseInsensitiveSort_DirectoryObject(a: DirectoryObject, b: DirectoryObject) {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  }

  /**
   * Helper Method:
   * Get the correct value for the dataname variable.
   * Action depends on blob data having name field.
   * @param ui8array blob object that "is" a valid zip file.
   * @param datafilename, optional. passed in file name.
   */
  private extractDataname(data: any, datafilename?: any): string {
    let dataname = '';
    datafilename = (!datafilename) ? '' : datafilename; // Allows the value to remain optional

    if (data.name) {
      dataname = data.name.substring(0, data.name.lastIndexOf('.'));
    } else {
      dataname = datafilename.substring(0, datafilename.lastIndexOf('.'));
    }

    return dataname;
  }

  /**
   * Helper Method:
   * Searches for directories matching dataname string as RegExp
   * @param dataname name of root folder determined from incoming parameters
   * @param zipDir JsZip object
   */
  private setRootFolder(dataname: string, zipDir: JSZip) {
    // Uses a regex to check that the folder exists (null check)
    if (zipDir.folder(new RegExp(dataname)).length) {
      // Changes to the folder specified in dataname
      return zipDir.folder(dataname);
    } else {
      this.SelectedFile = this.errorFile(`Package didn't match zip filename`);
      return null;
    }
  }

  /**
   * Helper Method:
   * Determines whether Java or Angular based on file structure
   * Sets zipDir appropriately and returns
   * @param zipDir - JSZip object currently at the root directory
   * @param dataname - A String representing the root directory
   * @returns updated zipDir if matching, initial otherwise.
   */
  private setRootByLanguage(zipDir: any, dataname: string) {
    if (zipDir.folder(/src\/main\/java/).length) {
      zipDir = zipDir.folder('src/main/java');
      this.filepath = dataname + '/src/main/java';
    } else if (zipDir.folder(/src\/app/).length) {
      zipDir = zipDir.folder('src/app');
      this.filepath = dataname + '/src/app';
    } else {
      console.log('malformed package. not angular or java');
      this.SelectedFile = this.errorFile('cannot determined repo language type');
      this.filepath = null;
    }

    return zipDir;
  }

  /**
   * Helper Method:
   * Prepares the fields used in the openData function for use
   */
  private openDataPrep() {
    //this.RenderFile = [];
    this.SelectedFile = this.downloadWaitFile();
    //this.OpenFile = [];
  }

  addToDirStructure(filePath: string): DirectoryObject[] {
    const filePathArray: string[] = filePath.split('/');

    return this.addToDirSchemaRecur(filePath, filePathArray, this.dirSchema);
  }

  private addToDirSchemaRecur(filePath: string, filePathArray: string[], baseFolder: DirectoryObject[]): DirectoryObject[] {

    let item: DirectoryObject;

    if (filePathArray.length !== 1) { // recurring case
      let nextDirectory: DirectoryObject = null;

      for (item of baseFolder) {
        if (item.name === filePathArray[0]){
          nextDirectory = item;
          break;
        }
      }

      // If the directory doesn't already exist, create it.
      if (nextDirectory === null) {
        const name = filePathArray[0];
        const contents: DirectoryObject[] = [];
        nextDirectory = new DirectoryObject(name, contents);
        baseFolder.push(nextDirectory);
      }

      // Remove the first element and move into the next directory
      // Assertion - Will not get here unless the contents is a DirectoryObject[]
      this.addToDirSchemaRecur(filePath, filePathArray.slice(1), nextDirectory.contents as DirectoryObject[]);

      return baseFolder;
    } else { // base case
      item = new DirectoryObject( filePathArray[0], filePath );
      baseFolder.push(item);
      return baseFolder;
    }
  }
}

  /**
   * Subclass for storing either a directory or a path string
   * @author Mike James (1906-Aug08)
   */
  export class DirectoryObject {
    name: string;
    contents: string | DirectoryObject[];

    constructor(name?: string,
                contents?: string | DirectoryObject[])
    {
      this.name = name;
      this.contents = contents;
    }
  }

  /**
  * RenderFile
  * SubClass for storing render related structure
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  class RenderFile {
    name: String;
    content: String;
  }