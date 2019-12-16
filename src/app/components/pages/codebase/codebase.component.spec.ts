import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LocationStrategy, PathLocationStrategy, Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatCardModule, MatGridListModule, MatButtonModule } from '@angular/material';
import { NgMetaService } from 'ngmeta';
import { HighlightModule } from 'ngx-highlightjs';
import { BehaviorSubject } from 'rxjs';
import * as JSZip from 'jszip';;

import { hljsLanguages } from 'src/app/app.module';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { CodebaseComponent } from './codebase.component';
import { DirectoryObject } from './directory_object';
import { EllipsisPipe } from 'src/pipes/ellipsis.pipe';
import { RenderFile } from './render_file';
import { Router } from '@angular/router';

class MockProjectService {
    CurrentProject$: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
    CurrentProject: Project;

    constructor() {
        this.CurrentProject = {
            status: 'approved',
            zipLinks: ['assets/codebase.zip'],
        };
        this.CurrentProject = this.CurrentProject;
        this.CurrentProject$.next(this.CurrentProject);
    }
}

describe('CodebaseComponent', () => {
    let component: CodebaseComponent;
    let fixture: ComponentFixture<CodebaseComponent>;
    let user: User;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let store;
    let router: Router;
    let location: Location;
    let projectService: ProjectService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CodebaseComponent, EllipsisPipe],
            imports: [MatCardModule, MatIconModule, MatGridListModule,
                MatButtonModule, HttpClientTestingModule,
                RouterTestingModule,
                HighlightModule.forRoot({ languages: hljsLanguages }),
                HttpClientTestingModule],
            providers: [Location, NgMetaService,
                { provide: ProjectService, useClass: MockProjectService }],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        store = {};

        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            return store[key] = value;
        });

        user = { firstName: 'Bill' };
        localStorage.setItem('user', JSON.stringify(user));

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        fixture = TestBed.createComponent(CodebaseComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should exit addToDirSchema when presented base case', () => {
        const filePath = 'filename.java';
        const expectedResult: DirectoryObject[] = [new DirectoryObject(filePath, filePath)];

        component.addToDirStructure(filePath);
        const retVal = component.dirStructure;

        expect(retVal).toEqual(expectedResult);
    });

    it('should build DirectoryObject as expected', () => {
        const filePath = 'first/second/file.object';
        component.addToDirStructure(filePath);
        const retVal: DirectoryObject[] = component.dirStructure;

        expect(retVal[0].name).toEqual('first');
        expect((retVal[0].contents[0] as DirectoryObject).name).toEqual('second');
        expect(((retVal[0].contents[0] as DirectoryObject).contents[0] as DirectoryObject).name).toEqual('file.object');
        expect(((retVal[0].contents[0] as DirectoryObject).contents[0] as DirectoryObject).contents).toEqual(filePath);
    });

    it('should build DirectoryObject as expected with two filePaths', () => {
        const filePathOne = 'first/second/file.object';
        const filePathTwo = 'first/third/file.object';
        component.addToDirStructure(filePathOne);
        component.addToDirStructure(filePathTwo);
        const retVal: DirectoryObject[] = component.dirStructure;

        expect(retVal[0].name).toEqual('first');
        expect((retVal[0].contents[0] as DirectoryObject).name).toEqual('second');
        expect((retVal[0].contents[1] as DirectoryObject).name).toEqual('third');
        expect(((retVal[0].contents[0] as DirectoryObject).contents[0] as DirectoryObject).name).toEqual('file.object');
        expect(((retVal[0].contents[1] as DirectoryObject).contents[0] as DirectoryObject).name).toEqual('file.object');
        expect(((retVal[0].contents[0] as DirectoryObject).contents[0] as DirectoryObject).contents).toEqual(filePathOne);
        expect(((retVal[0].contents[1] as DirectoryObject).contents[0] as DirectoryObject).contents).toEqual(filePathTwo);
    });

    it('should sort an array of DirectoryObjects by name w/o regard to case', () => {
        const first: DirectoryObject = new DirectoryObject('abc');
        const second: DirectoryObject = new DirectoryObject('nMl');
        const third: DirectoryObject = new DirectoryObject('XYZ');

        const testArray: DirectoryObject[] = [second, third, first];

        testArray.sort(component['caseInsensitiveSort_DirectoryObject']);

        expect(testArray).toEqual([first, second, third]);
    });

    it('should display downloading message if .zip is not yet ready to open', () => {
        component.downloadComplete = false;

        expect(component.getSelectMessage())
            .toEqual(`Thank you for your patience while the .zip file downloads from the project repository.`);
    });

    it('should display no .zip file message if no .zip file', () => {
        component.downloadComplete = true;
        component.project['zipLinks'] = [];

        expect(component.getSelectMessage())
            .toEqual(`We're sorry, this project doesn't have a .zip file attached to it.`)
    })

    it('should display select message if download completes', () => {
        component.downloadComplete = true;

        expect(component.getSelectMessage())
            .toEqual(`Please select a file to the left to continue.`);
    });

    it('should return error file', () => {
        const message = 'my message';
        const testFile = new RenderFile('HELP', `ERROR:${message}`);

        expect(component.errorFile(message)).toEqual(testFile);
    });

    it('should call back on click', () => {
        spyOn(component, 'goBack').and.callFake(function () { return null; });
        const button = fixture.debugElement.nativeElement.querySelector('#back-icon');
        button.click();

        fixture.detectChanges();

        expect(component.goBack).toHaveBeenCalled();
    });

    it('should filter files appropriately', () => {
        const file1 = { name: 'fileName.js' };
        const file2 = { name: 'fileName.war' };
        const file3 = { name: 'fileName.html' };
        const file4 = { name: 'fileName.java' };

        const files = [file1, file2, file3, file4];

        expect(component['filterFiles'](files)).toEqual([file1, file3, file4]);
    });

    it('should filter files appropriately, skip path', () => {
        const file1 = { name: 'fileName.js' };
        const file2 = { name: undefined };
        const file3 = { name: 'fileName.html' };
        const file4 = { name: 'fileName.java' };

        const files = [file1, file2, file3, file4];

        expect(component['filterFiles'](files)).toEqual([file1, file3, file4]);
    });

    it('should build the arrays and folders to display as expected', () => {
        const file1: DirectoryObject = { name: 'fileName.js', contents: './filename.fs' };
        const file2: DirectoryObject = { name: 'fileName.html', contents: './filename.html' };
        const nextFolder: DirectoryObject = { name: 'nextFolder', contents: [] as DirectoryObject[] };

        const directory = { name: 'folder', contents: [file1, file2, nextFolder] };

        component.displayDirectory(directory);

        expect(component.currLevelFiles).toContain(file1);
        expect(component.currLevelFiles).toContain(file2);
        expect(component.currLevelDirs).toContain(nextFolder);
    });

    it('should go back up the breadcrumb chain as expected', () => {
        const file1: DirectoryObject = { name: 'fileName.js', contents: './filename.fs' };
        const file2: DirectoryObject = { name: 'fileName.html', contents: './filename.html' };
        const nextDirectory: DirectoryObject = { name: 'nextDirectory', contents: [] as DirectoryObject[] };

        const directory = { name: 'folder', contents: [file1, file2, nextDirectory] };

        component.directoryChain = [directory, nextDirectory];

        component.breadcrumbJump(directory);

        expect(component.directoryChain).toContain(directory);
        expect(component.directoryChain.length).toEqual(1);
    });

    it('should restore localStorage from Array', () => {
        const cats = { key: 'cats', value: JSON.stringify(['Maisy', 'Mario', 'Archie', 'Bella', 'Bart', 'Sara']) };
        const proj = { key: 'project', value: JSON.stringify(component.project) };
        let array = [user, proj, cats];

        component['restoreLocalStorage'](array);
        expect(localStorage.getItem('cats')).toEqual(cats.value);
        expect(localStorage.getItem('project')).toEqual(JSON.stringify(component.project));
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
    });

    it('should be able to run sendRequest from a .zip location', () => {
        component.sendRequest(component.project.zipLinks[0]);
    });

    it('should route to home if no user', () => {
        localStorage.setItem('user', null);
        let navitageSpy = spyOn(router, 'navigate');

        component.ngOnInit();
        expect(navitageSpy).toHaveBeenCalledWith(['auth/login']);
    });

    it('should get dataname from data', () => {
        const data = { name: 'this.is.my.boomstick' };
        const dataFileName = 'file.Name';

        expect(component['extractDataname'](data, dataFileName)).toEqual('this.is.my');
    });

    it('should get dataname from data, empty data.name', () => {
        const data = { name: '' };
        const dataFileName = 'file.Name';

        expect(component['extractDataname'](data, dataFileName)).toEqual('file');
    });

    it('should get dataname from data, empty dataFileName', () => {
        const data = { name: 'this.is.my.boomstick' };
        const dataFileName = '';

        expect(component['extractDataname'](data, dataFileName)).toEqual('this.is.my');
    });

    it('should get dataname from data, empty both', () => {
        const data = { name: '' };
        const dataFileName = '';

        expect(component['extractDataname'](data, dataFileName)).toEqual('');
    });

    it('should be able to get filename from content-disposition header', () => {
        const headerString = 'Content-Disposition: attachment; filename=myfilename.txt'
        const expectedResult = 'myfilename.txt';

        expect(component['getFileNameFromHttpResponse'](headerString)).toEqual(expectedResult);
    });

    it('should be able to navigate to root folder', () => {
        // Creates a simple zip in ram, from https://stuk.github.io/jszip/
        var zip = new JSZip();
        zip.file("Hello.txt", "Hello World\n");
        var img = zip.folder("img1"); // Modified
        var img2 = img.folder("img2"); // Modified
        // End borrowed code
        let retVal: JSZip = component['setRootFolder']('img1', zip);

        expect(retVal.files).toEqual(img.files);
    });

    it('should return an error if sent a non-compliant zip', () => {
        // Creates a simple zip in ram, from https://stuk.github.io/jszip/
        var zip = new JSZip();
        zip.file("Hello.txt", "Hello World\n");
        var img = zip.folder("images");
        // End borrowed code

        const theSpyWhoZippedMe = spyOn(component, 'errorFile').and
            .callFake(function () { return null; });

        let retVal: JSZip = component['setRootFolder']('llamas', zip);

        expect(retVal).toBeNull;
        expect(theSpyWhoZippedMe)
            .toHaveBeenCalledWith(`Package didn't match zip filename`);
    });

    it('should call the location.back method to go back', () => {
        let mySpy = spyOn(location, 'back').and
            .callFake(function () { return null; });

        component.goBack();

        expect(mySpy).toHaveBeenCalled();
    });
});
