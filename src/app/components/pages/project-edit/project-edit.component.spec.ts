import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {ProjectEditComponent} from './project-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from 'src/app/services/user.service';
import {ProjectService} from 'src/app/services/project.service';
import {Router, ActivatedRoute} from '@angular/router';
import { MatIconModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Project } from 'src/app/models/Project';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { of } from 'rxjs';

/**
* Edit Project tests.
* Skipped tests do not work- router is not being correctly mocked. Use below resource for more information on mocking a router.
* https://codecraft.tv/courses/angular/unit-testing/routing/
* @author Gabriel Zapata | Fadi Alzoubi | Slavik Gleanco | Alex Johnson | Edward Bechtold | (190107-Java-Spark-USF)
*/
fdescribe('ProjectEditComponent', () => {
 let component: ProjectEditComponent;
 let fixture: ComponentFixture<ProjectEditComponent>;
 let userService: UserService;
 let mockRouter = {
   navigate: jasmine.createSpy('navigate')
 };
 let project: Project;
 let router: Router;

 beforeEach(async(() => {
   TestBed.configureTestingModule({
     declarations: [ ProjectEditComponent ],
     imports: [MatIconModule, MatCardModule, MatFormFieldModule,
       MatOptionModule, MatSelectModule,
       MatFormFieldModule, MatInputModule,
       HttpClientTestingModule, RouterTestingModule,
       BrowserAnimationsModule, FormsModule,
       ReactiveFormsModule],
     providers: [
       { provide: ActivatedRoute, useValue: { params: of({ id: 'test' })}},
       { provide: ProjectService, useClass: MockProjectService },
       { provide: Router, useValue: mockRouter },
       { provide: UserService, useClass: MockUserService } ],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
   })
   .compileComponents();
 }));

 beforeEach(() => {
   setJWTObject('pickles and popcorn');
   fixture = TestBed.createComponent(ProjectEditComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

 it('should create', () => {
   expect(component).toBeTruthy();
 });

 /**
  * Back function on component sets 'lastPage' in sessionStorage to 'edit'.
  * the 'toBe' matcher expects an exact match.
  * @author Edward Bechtold | Gabriel Zapata | (190107-Java-Spark-USF)
  */
 it('should set sessionStorage appropriately after back() function is called', () => {

   component.back();

   expect(sessionStorage.getItem('lastPage')).toBe('edit');
 });

 /**
  * AddGroupMember function should add a value to the updatedArr. The array
  * will have a value of truthy if a value is successfully added to it.
  * @author Gabriel Zapata | Edward Bechtold | (190107-Java-Spark-USF)
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
  * Remove 'x' from 'xit' to unskip.
  * @author Gabriel Zapata | Edward Bechtold | (190107-Java-Spark-USF)
  */
 it('should test initialization variables', () => {
   let testUser = {
     username: 'test'
   };
   let spy = spyOn(userService, 'getCurrentUser').and.returnValue(testUser);

   component.projectToUpdate.groupMembers = null;
   component.projectToUpdate.screenShots = null;
   component.projectToUpdate.zipLinks = null;

   component.ngOnInit();

   expect(spy).toHaveBeenCalled();
   expect(component.projectToUpdate.groupMembers).toBeTruthy();
   expect(component.projectToUpdate.screenShots).toBeTruthy();
   expect(component.projectToUpdate.zipLinks).toBeTruthy();
 });

 /**
  * This method should test if fields are invalid inside checkForValidField function.
  * @author Gabriel Zapata | Alex Johnson | (190107-Java-Spark-USF)
  */
 it('should validateFields', () => {
   let nameField = { valid: false };
   let batchField = { valid: false };
   let trainerField = { valid: false };
   let descriptionField = { valid: false };
   let techStackField = { valid: false };

   component.checkForValidField(nameField, batchField, trainerField, descriptionField, techStackField);

   expect(component.validForm).toBeFalsy();
 });

 /**
  * testing that when the edit-project component is rendered, if the user is null
  * then the user should be navigated back to login
  * @author Alex Johnson (190107-Java-Spark-USF)
  */
 xit('should navigate to login if the user is null', () => {

   router = TestBed.get(Router);
   localStorage.clear();
   localStorage.setItem('user', null);
   let navigateSpy = spyOn(router, 'navigate');

   component.ngOnInit();

   expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
 });

 /**
  * The tested method should navigate to home.
  * Implementation is not correct ; needs refactoring.
  * @author Alex Johnson (190107-Java-Spark-USF)
  */
 xit('should navigate to home', () => {

   router = TestBed.get(Router);
   let navigateSpy = spyOn(router, 'navigate');

   component.submitForm();

   expect(navigateSpy).toHaveBeenCalledWith(['/home']);
 });

 /**
  * The back() method should navigate to home.
  * @author Alex Johnson (190107-Java-Spark-USF)
  */
 it('should navigate to home', () => {

   router = TestBed.get(Router);
   let navigateSpy = spyOn(router, 'navigate');

   component.back();

   expect(navigateSpy).toHaveBeenCalledWith(['/home']);
 });

 it('should return a project', () => {
   const submitbutton = fixture.debugElement.nativeElement.querySelector('#submit-update');
   console.log(submitbutton);
   submitbutton.click();
   fixture.detectChanges();
   expect(mockRouter.navigate).toHaveBeenCalledWith(['projects/1']);

 });


 it('#submitForm should update the form data', () => {
   // Arrange
   const batch = '3rd Batch Java';
   const trainer = 'Nick';
   const groupMembers = ['Mike', 'Molly', 'Sam'];
   const techStack = 'Java';
   const description = 'This is a fake project for testing';
   const status = 'not pending';

   // Act
   const submitbutton = fixture.debugElement.nativeElement.querySelector('#submit-update');
   submitbutton.click();


   //Assert
   expect(component.projectToUpdate.status).toEqual(status);
   expect(component.projectToUpdate.batch).toEqual(batch);
   expect(component.projectToUpdate.trainer).toEqual(trainer);
   expect(component.projectToUpdate.groupMembers).toEqual(groupMembers);
   expect(component.projectToUpdate.techStack).toEqual(techStack);
   expect(component.projectToUpdate.description).toEqual(description);
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
