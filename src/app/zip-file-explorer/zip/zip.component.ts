import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import { NgMetaService } from 'ngmeta';

import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-zip-component',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.scss']
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
export class ZipComponent implements OnInit {
  RenderFile: RenderFile[] = [];
  SelectedFile: RenderFile;
  OpenFile: RenderFile[] = [];
  filepath = '';
  browserSupported = true;
  availableUrls: string [] = [];
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

      this.browserSupported = isTextDecoderSupported;
      if (this.projectService.CurrentProject) {
        this.availableUrls = this.projectService.CurrentProject.zipLinks;
      }
    }
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
    testfile.fileContent =
    `ERROR:${message}`;
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
    testfile.fileContent =
    `HELPME: use the first 🗁 (blue) to import the remote saved codebase zip.
use the second 🗁 (green) to open a local repo zip.
⌂ to return to the websites

Currently can open and navigate to the src directory of Angular and Java Repositories
    `;
    return testfile;
  }
  safeTitle(link: string) {
    return link.substring(link.lastIndexOf('/') + 1);
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
   * @param data. ui8array blob object that "is" a valid zip file.
   * @param datafilename, optional. passed in file name.
   * @author Andrew Mitchem (1810-Oct08-Java-USF)
   */
  openData(data , datafilename?) {
    this.RenderFile = [];
    this.SelectedFile = this.defaultFile();
    this.OpenFile = [];
    let dataname = '';
    if (data.name) {
        dataname = data.name.substring(0, data.name.lastIndexOf('.'));
    } else {
        dataname = datafilename.substring(0, datafilename.lastIndexOf('.'));
    }
    const zip = new JSZip();
    // new instance of JSZip. note this object lifecycle needs to be undone after rendering
    // as such it not a class member but function member only for the scope of this function closure
    zip.loadAsync(data)
    .then(contents => {
      // move to the sub folder inside the zip file: replace with pass paramater variables
      if (!zip.folder(new RegExp(dataname)).length) {
        this.SelectedFile = this.errorFile('Package didn\'t match zip filename');
        return;
      }
      let dirFolder =  zip.folder(dataname);
      if (dirFolder.folder(/src\/main\/java/).length) {
        dirFolder =  dirFolder.folder('src/main/java');
        this.filepath = dataname + '/src/main/java';
      } else if (dirFolder.folder(/src\/app/).length) {
        dirFolder =  dirFolder.folder('src/app');
        this.filepath = dataname + '/src/app';
      } else {
        console.log('malformed package. not angular or java');
        this.SelectedFile = this.errorFile('cannot determined repo language type');
        return;
      }
      const fileArray = dirFolder.file(/^.*/); // get the array of all files in this subdirectory
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        this.parseFiles(file);
      }
    });
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
      fileName = fileName.substring(fileName.lastIndexOf('/') + 1);
      // remove leading path in name
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
