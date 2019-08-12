import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import * as JSZip from 'jszip';
import { NgMetaService } from 'ngmeta'; // TODO use to change title to 'Edit | RPM' or something
import { ProjectService } from 'src/app/services/project.service';
import { EllipsisPipe } from 'src/app/ellipsis.pipe';
import { Project } from 'src/app/models/Project';
import { DirectoryObject } from './directory_object';
import { RenderFile } from './render_file';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-codebase',
  templateUrl: './codebase.component.html',
  styleUrls: ['./codebase.component.scss']
})
export class CodebaseComponent implements OnInit {

  SelectedFile: RenderFile;
  blobBody: Blob;
  project: Project;
  filepath = '';
  browserSupported = true;
  directoryChain: DirectoryObject[] = [];

  currLevel: DirectoryObject[]; // The current directory
  currLevelDirs: DirectoryObject[]; // Current level directories
  currLevelFiles: DirectoryObject[]; // Current level files
  downloadComplete: boolean;

  goodTypes: string[] = ['.prefs',  '.xml',   '.java',  '.properties',
                              '.css',   '.scss',  '.sass',  '.cs',
                              '.html',   '.htm',   '.js',    '.ts',
                              '.py',     '.log'];

  dirStructure: DirectoryObject[];

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
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    if (!this.userService.getCurrentUser) {
      this.router.navigate(['/auth/login']);
    } else {
      this.ngmeta.setHead({ title: 'Code | RPM' });
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

        // Currently only displays the first of a collection of zip files.
        // TODO - Need to figure out how to download multiple files
        this.project = {zipLinks: ['https://ms84103newbucket.s3.amazonaws.com/msTRMS.zip']};
        if (this.project.zipLinks[0]) {
          this.SelectedFile = new RenderFile('Setup', this.getSelectMessage());
          this.browserSupported = isTextDecoderSupported;
          this.sendRequest(this.project.zipLinks[0]);
        }
    }
    this.dirStructure = [];
  }

  getSelectMessage() {
    if (!this.downloadComplete) {
      return `Thank you for your patience while the .zip file downloads from the project repository.`;
    } else if (!this.project.zipLinks[0]) {
      return `We're sorry, this project doesn't have a .zip file attached to it.`;
    } else {
      return `Please select a file to the left to continue.`;
  }
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
   * goBack()
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
   * getFileNameFromHttpResponse()
   * splits content-dispotion header ; attachmenent file=filename.ext into file name
   * from stack overflow
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  private getFileNameFromHttpResponse(contentDispositionHeader) {
    const result = contentDispositionHeader.split(';')[1].trim().split('=')[1];
    return result.replace(/"/g, '');
  }

  /**
   * openData()
   * unpacks a zip blob(ui8array) and opens with JSZip (zip is the reference variable)
   * @param ui8array blob object that "is" a valid zip file.
   * @param datafilename, optional. passed in file name.
   * @author Andrew Mitchem (1810-Oct08-Java-USF) | Mike James (1906-Java-USF)
   */
  private openData(datafilename?: string): void {
    let zipDir: JSZip = new JSZip();

    const dataname: string = this.extractDataname(this.blobBody, datafilename);

    zipDir.loadAsync(this.blobBody).then( contents => {
      // Checks if the zip contains a directory matching dataname, changes to that directory
      zipDir = this.setRootFolder(dataname, zipDir);

      if (!zipDir) {
        return; // If no such folder, return.
      }

      // If we get here, we record that we've received data
      this.downloadComplete = true;
      this.SelectedFile.content = this.getSelectMessage();

      let fileArray = zipDir.file(/^.*/); // get the array of all files in this subdirectory

      fileArray = this.filterFiles(fileArray);

      // Build Directory Structure
      for (let i = 0; i < fileArray.length; i++) {
        this.addToDirStructure(fileArray[i].name);
      }

      // We assume that the root directory is a directory...
      this.displayDirectory(this.dirStructure[0] as DirectoryObject); 
    });
  }

  /**
   * openFileInCodeWindow()
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
        let fileContent = 'We are sorry, your browser may not be supported';
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

  /**
   * Filters files from .zip file to prevent display of undsirable (non-text) files
   * @param filesArray - Array of files to be filtered
   * @returns filtered array of files
   * @author Mike James (1906-Java)
   */
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

  /**
   * Pushes the contents of a directory to the display projects area
   * @param directory - The directory to be displayed
   * @author Mike James (1906-Java)
   */
  displayDirectory(directory: DirectoryObject): void {
    this.currLevelDirs = [];
    this.currLevelFiles = [];
    this.directoryChain.push(directory);

    let dirContents: DirectoryObject[] = directory.contents as DirectoryObject[];

    for (let i = 0; i < dirContents.length; i++) {
      const currValue: DirectoryObject = dirContents[i];
      const currContents: string | DirectoryObject[] = currValue.contents;

      if (typeof(currContents) === 'string') {
        this.currLevelFiles.push(currValue);
      } else {
        this.currLevelDirs.push(currValue);
      }
    }

      this.currLevelDirs.sort(this.caseInsensitiveSort_DirectoryObject);
      this.currLevelFiles.sort(this.caseInsensitiveSort_DirectoryObject);
  }

  breadcrumbJump(dir: DirectoryObject) {
    while (this.directoryChain[this.directoryChain.length - 1] !== dir) {
      this.directoryChain.pop();
    }

    this.directoryChain.pop();  // displayDirectory will re-add the directory
    this.SelectedFile.content = this.getSelectMessage();

    this.displayDirectory(dir);
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
   * Entry point to the method which adds files to directory structure
   * @param filePath - Path of tile to be added to directory structure
   */
  addToDirStructure(filePath: string): DirectoryObject[] {
    const filePathArray: string[] = filePath.split('/');

    return this.addToDirSchemaRecur(filePath, filePathArray, this.dirStructure);
  }

  /**
   * Builds the directory structure from the filepaths passed in
   * 
   * @param filePath - Full path of current file under consideration 
   * @param filePathArray - Array of substrings broken by / character
   * @param baseFolder - Root folder to begin building from
   * @returns Constructed base folder as DirectoryObject[]
   * @author Mike James (1906-Java)
   */
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
