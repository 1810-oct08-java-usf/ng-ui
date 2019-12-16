import { Location } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { MatIconModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, ActivatedRoute} from '@angular/router';
import { of } from 'rxjs';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import { Project } from 'src/app/models/Project';
import {ProjectService} from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import {UserService} from 'src/app/services/user.service';
import {ProjectEditComponent} from './project-edit.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
import {Observable, throwError} from 'rxjs'; 
/**
* Edit Project tests.
* 
*/
describe('ProjectEditComponent', () => {
 let component: ProjectEditComponent;
 let fixture: ComponentFixture<ProjectEditComponent>;
 let project: Project;
 let router: Router;
 let routerSpy;
 let projectService: ProjectService;
 let snackbarService: SnackbarService;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ProjectEditComponent ],
     imports: [MatIconModule, MatCardModule, MatFormFieldModule,
       MatOptionModule, MatSelectModule, MatSnackBarModule,
       MatFormFieldModule, MatInputModule,
       HttpClientTestingModule, RouterTestingModule,
       BrowserAnimationsModule, FormsModule, BrowserDynamicTestingModule,
       ReactiveFormsModule],
     providers: [ 
       { provide: ActivatedRoute, useValue: { params: of({ id: 'test' })}},
       { provide: ProjectService, useClass: MockProjectService },
       { provide: UserService, useClass: MockUserService },
       { provide: SnackbarService, useClass: SnackbarService} 
      ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   setJWTObject('pickles and popcorn');
   fixture = TestBed.createComponent(ProjectEditComponent);
   component = fixture.componentInstance;
   
   router = TestBed.get(Router);
   routerSpy = spyOn(router, 'navigate')
     .and.callFake(function() { return null; }); 

   fixture.detectChanges();
 });

 afterEach(() => {
   component = null;
   router = null;
   routerSpy = null;
   sessionStorage.clear();
 });

 it('should create', () => {
   expect(component).toBeTruthy();
 });

 /**
  * Back function on component sets 'lastPage' in sessionStorage to 'edit'.
  * the 'toBe' matcher expects an exact match.
  * 
  */
 it('clicking the back button will invoke window.history.back()', () => {

  let backIcon = fixture.debugElement.query(By.css('#back-icon'));
  
  backIcon.nativeElement.click();

  expect(window.history.back).toHaveBeenCalled;
   
 });
 
 /**
  * AddGroupMember function should add a value to the updatedArr. The array
  * will have a value of truthy if a value is successfully added to it.
  */
 it('should add a group member to the updatedArr', () => {

   component.projectToUpdate.groupMembers = [];
   component.groupMember = 'test';
   let updatedArr = component.projectToUpdate;
   component.addGroupMember();

   expect(updatedArr).toBeTruthy();
 });

 /**
  * Supposed to test initialization variables within ngoninit. Implementation is wrong but might be salvageable.
  */
 it('should test initialization variables', () => {
   component.projectToUpdate.groupMembers = null;
   component.projectToUpdate.screenShots = null;
   component.projectToUpdate.zipLinks = null;

   component.ngOnInit();

   expect(component.projectToUpdate.groupMembers).toBeTruthy();
   expect(component.projectToUpdate.screenShots).toBeTruthy();
   expect(component.projectToUpdate.zipLinks).toBeTruthy();
   expect(component.groupMember).toEqual('');
 });

 /**
  * This method should test if the form has any errors/invalid fields.
  */
 it('should validateFields', () => {
  
  let projectService = TestBed.get(ProjectService);
 
  projectService.CurrentProject$.next(new BehaviorSubject<Project>(null))

  component.ngOnInit();

  expect(component.editForm.hasError).toBeTruthy();
  expect(component.editForm.controls['projectName'].hasError('required')).toBeTruthy();
  expect(component.editForm.controls['trainerName'].hasError('required')).toBeTruthy();
  expect(component.editForm.controls['batchName'].hasError('required')).toBeTruthy();
  expect(component.editForm.controls['techStack'].hasError('required')).toBeTruthy();
  expect(component.editForm.controls['description'].hasError('required')).toBeTruthy();
  expect(component.editForm.controls['groupMembers'].hasError('required')).toBeTruthy();

 });

 /**
  * The tested method should navigate to home.
  * Implementation is not correct ; needs refactoring.
  */
 it('should navigate to projects list route on submit', () => {
  projectService = TestBed.get(ProjectService);
  let projectSpy = spyOn(projectService, 'submitEditRequest').and.returnValue(of(component.projectToUpdate));

  component.submitForm();

  expect(projectSpy).toHaveBeenCalled();
  expect(window.history.back).toHaveBeenCalled;
 });

 it('if submission has error, it console logs error, and opens a SnackBar msg', () => {

   projectService = TestBed.get(ProjectService);
   let snackbarService = TestBed.get(SnackbarService);
   let snackSpy = spyOn(snackbarService, 'openSnackBar').and.returnValue(of("Something went wrong"));
   let projectSpy = spyOn(projectService, 'submitEditRequest').and.returnValue(throwError('error message'));

   component.submitForm();

   expect(projectSpy).toHaveBeenCalled();
   expect(snackSpy).toHaveBeenCalled() 
 });

 it('Should remove group member when member is clicked on', () => {
  let memberDivs = fixture.debugElement.queryAll(By.css('.member-div'));
  
  let mike = memberDivs[0].nativeElement
  mike.click();
  expect(component.projectToUpdate.groupMembers.length).toEqual(2);
  expect(component.projectToUpdate.groupMembers.includes('Mike')).toBeFalsy();
 });

 it('Should cancel the edit attempt and return you back to project view when cancel is clicked.', () => {
   let cancelButton = fixture.debugElement.query(By.css('#cancel'));
   cancelButton.nativeElement.click();

   expect(window.history.back).toHaveBeenCalled;
 });

});

function setJWTObject(jwt: string) {
 let store = {};
 spyOn(localStorage, 'getItem').and.callFake(function (key) {
   return store[key];
 });
 spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
   return store[key] = value;
 });
 localStorage.setItem('jwt', JSON.stringify(jwt));
 return jwt;
}
