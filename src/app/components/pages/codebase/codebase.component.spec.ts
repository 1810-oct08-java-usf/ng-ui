import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatCardModule } from '@angular/material';
import { NgMetaService } from 'ngmeta';
import { HighlightModule } from 'ngx-highlightjs';
import { BehaviorSubject } from 'rxjs';

import { hljsLanguages } from 'src/app/app.module';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { CodebaseComponent } from './codebase.component';
import { DirectoryObject } from './directory_object';

class MockProjectService {
  CurrentProject$: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  CurrentProject: Project;
  
  constructor() {
    this.CurrentProject = {
      status: 'approved',
      zipLinks: [],
    };
    this.CurrentProject = this.CurrentProject;
    this.CurrentProject$.next(this.CurrentProject);
  }
}

describe('CodebaseComponent', () => {
  let component: CodebaseComponent;
  let fixture: ComponentFixture<CodebaseComponent>;
  let user: User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodebaseComponent ],
      imports: [ HttpClientTestingModule, RouterTestingModule, HighlightModule.forRoot({ languages: hljsLanguages }) ],
      providers: [ Location, {provide: LocationStrategy,
        useClass: PathLocationStrategy }, NgMetaService,
        {provide: ProjectService, useClass: MockProjectService } ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value;
    });
    user = {firstName: 'Bill' };

    localStorage.setItem('user', JSON.stringify(user));

    fixture = TestBed.createComponent(CodebaseComponent);
    component = fixture.componentInstance;
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

  fit('should sort an array of DirectoryObjects by name w/o regard to case', () => {
    const first: DirectoryObject = new DirectoryObject('abc');
    const second: DirectoryObject = new DirectoryObject('nMl');
    const third: DirectoryObject = new DirectoryObject('XYZ');

    const testArray: DirectoryObject[] = [second, third, first];

    testArray.sort(component['caseInsensitiveSort_DirectoryObject']);

    expect(testArray).toEqual([first, second, third]);
  });

});
