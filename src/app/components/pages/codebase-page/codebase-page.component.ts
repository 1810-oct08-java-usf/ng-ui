import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import { NgMetaService } from 'ngmeta';
import { ProjectService } from 'src/app/services/project.service';



@Component({
  selector: 'codebase-page-component',
  templateUrl: './codebase-page.component.html',
  styleUrls: ['./codebase-page.component.scss']
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
  OpenFile: RenderFile[] = [];
  filepath = '';
  browserSupported = true;
  availableUrls: string [] = [];
  title = '';

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
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/auth/login']);
    } else {
      this.ngmeta.setHead({ title: 'Code | RPM' });
      this.SelectedFile = this.defaultFile();
      let isTextDecoderSupported = false;
      try {
        isTextDecoderSupported  = !!new TextDecoder('utf-8');
      } catch (e) {
      }

      this.goodTypes = ['.prefs',  '.xml',   '.java',  '.properties',
                        '.css',   '.scss',  '.sass',  '.cs',
                        '.html',   '.htm',   '.js',    '.ts',
                        '.py',     '.log'];

      this.browserSupported = isTextDecoderSupported;
      this.sendRequest('https://ms84103newbucket.s3.amazonaws.com/msTRMS.zip');
      // if (this.projectService.CurrentProject) {
      //   this.availableUrls.push('https://ms84103newbucket.s3.amazonaws.com/msTRMS.zip'); //this.projectService.CurrentProject.zipLinks;
      // }
    }

    this.dirSchema = [];
  }

  /**
   * Zip.errorFile()
   * sets the defualt display for error messages
   * @param message: Error message
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  errorFile(message: string): RenderFile {
    const testfile = new  RenderFile();
    testfile.fileName = 'HELP';
    testfile.fileContent = `ERROR:${message}`;
    return testfile;
  }

  /**
   * Zip.defualtFile()
   * sets the defualt display message as a helpme file
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  defaultFile(): RenderFile {
    const testfile = new  RenderFile();
    testfile.fileName = 'HELP';
    testfile.fileContent = `HELPME: use the first 🗁 (blue) to import the remote saved codebase zip.
                            use the second 🗁 (green) to open a local repo zip.
                            ⌂ to return to the websites
                            Currently can open and navigate to the src directory of Angular and Java Repositories
    `;
    return testfile;
  }
  
  safeTitle(link: string) {
    this.title = link.substring(link.lastIndexOf('/') + 1);
    return this.title;
  }

  /**
   * Zip.goBack()
   * Redirects back to the last page
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  goBack() {
    this.location.back();
  }
  openRenderFile(renderFile: RenderFile) {
    this.SelectedFile = renderFile;
    if (!this.OpenFile.includes(renderFile)) {
      this.OpenFile.push(renderFile);
    }
  }
  closeRenderFile(renderFile: RenderFile) {
    this.OpenFile.splice(this.OpenFile.indexOf(renderFile), 1);
    if (this.OpenFile.length) {
      this.SelectedFile = this.defaultFile();
    }
  }

  /**
   * Zip.sendRequest()
   * Fire off an http request to retrieve the zip file
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  sendRequest(url: string) {
    // reponse type is arraybuffer so the get request knows this is a oclet-array-stream request
    this.http.get(url, { observe: 'response', responseType: 'blob'})
    .subscribe(blob => {
      console.log(153);
      // after the array is retrieve. open the data with JSZip
      if (blob.headers.get('content-disposition')) {
        const datafilename = this.getFileNameFromHttpResponse(blob.headers.get('content-disposition'));
        this.openData(blob.body, datafilename);
      } else {
        const datafilename = url.substring(url.lastIndexOf('/') + 1);
        this.openData(blob.body, datafilename);
      }
    }, error => {
      this.SelectedFile = this.errorFile('Yeah we couldn\'t find this file: we\'re Sorry');
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
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  openData(data: Blob, datafilename?: string) {
    // new instance of JSZip.
    // Should only exist through the end of this function
    let zipDir: JSZip = new JSZip();

    this.openDataPrep();
    const dataname: string = this.extractDataname(data, datafilename);

    zipDir.loadAsync(data).then( contents => {
      // Checks if the zip contains a directory matching dataname, changes to that directory
      zipDir = this.setRootFolder(dataname, zipDir);

      if (!zipDir) {
        return; // If no such folder, return.
      }
      let fileArray = zipDir.file(/^.*/); // get the array of all files in this subdirectory

      fileArray = this.filterFiles(fileArray);

      // // Uses Regex to determine if Java, Angular, or neither and moves to correct directory
      // zipDir = this.setRootByLanguage(zipDir, dataname);

      // if (!this.filepath) {
      //   return; // If neither Java nor Angular, return.
      // }

      // fileArray = zipDir.file(/^.*/); // get the array of all files in this subdirectory
      // console.log(fileArray);

      // this.dirSchema = [];
      // console.log(zipDir.files);

      // List out all files on screen
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        this.parseFiles(file);
        this.addToDirSchema(file.name);
      }
      console.log(this.dirSchema);
    });
  }

  filterFiles(filesArray: any[]) {

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
   * Searches for directories matching dataname string as RegExp. 
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
    this.RenderFile = [];
    this.SelectedFile = this.defaultFile();
    this.OpenFile = [];
  }

  addToDirSchema(filePath: string): DirectoryObject[] {
    let filePathArray: string[] = filePath.split('/');
    let baseFolder: DirectoryObject[] = [];

    
    return this.addToDirSchemaRecur(filePath, filePathArray, this.dirSchema);
  }
  
  private addToDirSchemaRecur(filePath: string, filePathArray: string[], baseFolder: DirectoryObject[]):
     DirectoryObject[] {
    
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

  /**
   * Zip.parseFiles(file)
   * opens and individual zip file. This method ignores files that are directories (ie. not files with contnet)
   * @param file. ZipObject (class of JSzip) to be unpacked into a normal blob object
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  parseFiles(file) {
    // check if file is a directory
    if (!file.dir) {
      let fileName = file.name;

      // save ZipObject file name as once unzip into a  standard file  we loose acess to this data
      fileName = fileName.replace(this.filepath, '');

      // remove leading path in name
      fileName = fileName.substring(fileName.lastIndexOf('/') + 1);

      const helpme = file.async('uint8array').then(function (data) { // converts the ZipObject
        let string = 'Placeholder Text \n we are sorry your browser may not be supported';
        string = new TextDecoder('utf-8').decode(data);
        return string;
      });

      helpme.then(string => {
        const file = new RenderFile();
        file.fileName = fileName;
        file.fileContent = string; // "file here is a string text readable format stored for rendering logic"
        this.RenderFile.push(file);
      });
    } else {
      file.fileName = 'Error';
            file.fileContent = `Sorry @Browser not currently supported
            ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈████≈
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈█████≈
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈███████
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈████████
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈█████████
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈███▒▒████
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈████▒▒▒███
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈███▒▒▒▒▒██
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈███▒▒▒▒▒▒██
≈≈≈≈≈≈████████≈≈≈≈≈≈≈≈≈≈≈≈██▒▒▒▒▒▒▒██
≈≈≈≈███████████≈≈≈≈≈≈≈≈≈≈≈██▒▒▒▒▒▒▒██
≈≈██████████████≈≈≈≈≈≈≈≈≈≈█▒▒▒▒▒▒▒▒██
███████████▒▒▒▒██≈≈≈≈≈≈≈≈≈█▒▒▒▒▒▒▒▒██
████████▒▒▒▒▒▒▒▒██≈≈≈≈≈≈≈≈█▒▒▒▒▒▒▒▒██
██████▒▒▒▒▒▒▒▒▒▒▒█≈≈████≈≈██▒▒▒▒▒▒▒██
███████▒▒▒▒▒▒▒▒▒▒███████████▒▒▒▒▒▒▒██
███████▒▒▒▒▒▒▒▒▒▒██▒▒▒▒▒▒▒██▒▒▒▒▒▒▒██
≈█████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██≈
≈≈█████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██≈≈
≈≈≈█████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██≈≈≈
≈≈≈≈██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██≈≈≈≈
≈≈≈≈≈██████▒▒▒▒▒▒██▒▒▒▒▒▒▒▒▒██▒██≈≈≈≈
≈≈≈≈≈≈████████▒▒█▌▐█▒▒▒▒▒▒▒█▌▐█▒█≈≈≈≈
≈≈≈≈≈≈≈≈█████▒▒▒█▌▐█▒▒▒▒▒▒▒█▌▐█▒█≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈█▒▒▒████▒▒▒▒▒▒▒████▒██≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈█▒▒▒████▒▒▒▒█▒▒████▒██≈≈≈
≈≈≈≈≈≈≈≈≈≈≈██▒▒▒███▒▒▒▒▒▒▒▒▒███▒▒█≈≈≈
≈≈≈≈≈≈≈≈≈≈≈██▒▒▒▒▒▒▒▒██████▒▒▒▒▒▒█≈≈≈
≈≈≈≈≈≈≈≈≈≈≈██▒███▒▒▒▒██████▒▒▒████≈≈≈
≈≈≈≈≈≈≈≈≈≈≈████▒██▒▒▒██████▒▒█▒▒██≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈██▒▒▒█▒▒▒██████▒▒█▒▒██≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈██▒▒▒█▒▒▒██████▒▒█▒▒█≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈██▒▒▒█▒▒▒██████▒▒█▒▒█≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈≈██▒██▒▒▒▒████▒▒▒█▒█≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈████▒▒▒▒▒▒▒▒▒▒▒▒▒▒██≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈██████▒▒▒▒▒▒▒▒▒▒▒▒▒██≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈██▒▒▒▒█▒▒▒▒▒▒▒▒▒▒▒█████≈≈≈≈
≈≈≈≈≈≈≈≈≈███▒▒▒▒▒██▒▒▒▒▒▒▒██▒▒▒███≈≈≈
≈≈≈≈≈≈≈≈≈≈█▒▒▒▒▒▒██████████▒▒▒▒▒██≈≈≈
≈≈≈≈≈≈≈≈≈≈██▒▒▒▒▒▒█████████▒▒▒▒▒██≈≈≈
≈≈≈≈≈≈≈≈≈████▒▒▒▒▒█████████▒▒▒▒██≈≈≈≈
≈≈≈≈≈≈≈≈███████▒▒▒███▒████▒▒▒▒██≈≈≈≈≈
≈≈≈≈≈≈███████████▒▒██▒▒▒█▒▒▒███≈≈≈≈≈≈
≈≈≈≈≈██████████▒▒▒▒█▒▒▒▒█▒███≈≈≈≈≈≈≈≈
≈≈≈≈███████████▒▒▒▒▒▒▒▒▒▒▒██≈≈≈≈≈≈≈≈≈
≈≈≈≈████████≈≈██▒▒▒▒▒▒▒▒▒▒█≈≈≈≈≈≈≈≈≈≈
≈≈≈≈≈██████≈≈███▒▒▒▒▒▒▒▒▒▒█≈≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈████≈≈██▒▒█▒▒▒▒▒▒▒▒▒█≈≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈███≈≈██▒▒▒▒█▒▒▒▒▒▒▒██≈≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈██▒▒▒▒████▒▒▒█▒█≈≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈█▒▒▒▒▒█≈≈████▒▒██≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈█▒█▒█▒█≈≈≈≈█▒▒▒▒█≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈█████≈≈≈≈≈█▒▒▒▒█≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈█▒▒▒▒█≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈█▒▒▒▒█≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈█▒█▒█≈≈≈≈≈≈≈≈≈
≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈███≈≈≈≈≈≈≈≈≈≈
            `;
        this.RenderFile.push(file);
      }
    }
  };

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
  * Tree
  * SubClass for storing render related structure
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  class Tree {
    name: string;
    files: File[] = [];
    tree: Tree[] = [];
  }

  /**
  * RenderFile
  * SubClass for storing render related structure
  * @author Andrew Mitchem (1810-Oct08-Java-USF)
  */
  class RenderFile {
    fileName: String;
    fileContent: String;
  }