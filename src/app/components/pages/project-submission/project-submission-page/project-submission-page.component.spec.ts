import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { 
	MatCardModule, 
	MatInputModule, 
	MatOptionModule, 
	MatDialogModule, 
	MatSelectModule, 
	MatSnackBarModule, 
	MatFormFieldModule, 
	MatProgressSpinnerModule
} from '@angular/material';

import { NgMetaService } from 'ngmeta';
import { browser, by, element } from 'protractor';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { ProjectSubmissionPageComponent } from './project-submission-page.component';

describe('ProjectSubmissionPageComponent', () => {
	let router: Router;
	let routerSpy;
	let component: ProjectSubmissionPageComponent;
	let fixture: ComponentFixture<ProjectSubmissionPageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProjectSubmissionPageComponent ],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			imports: [
				FormsModule,
				MatCardModule, 
				MatInputModule,
				MatOptionModule, 
				MatSelectModule,
				MatDialogModule,
				MatSnackBarModule, 
				MatFormFieldModule, 
				ReactiveFormsModule, 
				RouterTestingModule,
				NoopAnimationsModule,
				HttpClientTestingModule, 
				MatProgressSpinnerModule, 
			],
			providers: [
				NgMetaService,
				{provide: UserService, useClass: MockUserService},
				{provide: ProjectService, useClass: MockProjectService},
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		setJWTObject('picklejuice');

		fixture = TestBed.createComponent(ProjectSubmissionPageComponent);
		component = fixture.componentInstance;
		component.ngOnInit();

		router = TestBed.get(Router);
		routerSpy = spyOn(router, 'navigate')
			.and.callFake(function() { return null; });

		fixture.detectChanges();
	});

	afterEach(() => {
		router = null;
		component = null;
		routerSpy = null;
	})

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	//all formData from start after ngOnInit()
	it('approvingProject falsy when empty', () => { expect(component.projectToUpload.approvingProject).toBeFalsy(); });
	it('batch falsy when empty', () => { expect(component.projectToUpload.batch).toBeFalsy(); });
	it('dataModel starts empty', () => { expect(component.projectToUpload.dataModel.length).toBe(0); });
	it('description falsy when empty', () => { expect(component.projectToUpload.description).toBeFalsy(); });
	it('groupMembers starts empty', () => { expect(component.projectToUpload.groupMembers.length).toBe(0); });
	it('id falsy when empty', () => { expect(component.projectToUpload.id).toBeFalsy(); });
	it('name falsy when empty', () => { expect(component.projectToUpload.name).toBeFalsy(); });
	it('oldProject falsy when empty', () => { expect(component.projectToUpload.oldProject).toBeFalsy(); });
	it('projectApproved falsy when empty', () => { expect(component.projectToUpload.projectApproved).toBeFalsy(); });
	it('projectDeclined falsy when empty', () => { expect(component.projectToUpload.projectDeclined).toBeFalsy(); });
	it('screenShots starts empty', () => { expect(component.projectToUpload.screenShots.length).toBe(0); });
	it('status falsy when empty', () => { expect(component.projectToUpload.status).toBeFalsy(); });
	it('techStack falsy when empty', () => { expect(component.projectToUpload.techStack).toBeFalsy(); });
	it('userId starts with value from user', () => { expect(component.projectToUpload.userId).toBe(1234); });

	//testing form when filled with mockProject
	it('testing all inputs being filled with mock', () => {
		component.projectToUpload.name = "Fake Project";
		component.projectToUpload.batch = "3rd Batch Java";
		component.projectToUpload.trainer = "Nick";
		component.projectToUpload.groupMembers = ['Mike', 'Molly', 'Sam'];
		component.projectToUpload.techStack = "Java";
		component.projectToUpload.description = "This is a fake project for testing";
		component.projectToUpload.status = "not pending";
		component.projectToUpload.screenShots = ['aValue'];
		component.projectToUpload.zipLinks = ['value'];

		expect(component.projectToUpload).toBeTruthy();
	});

	//testing if it will enter the snackbar block
	it('should throw problems if there is no data on submit press', () => {
		component.submitForm();
		expect(component.problems).toBeTruthy();
	});

});

function setJWTObject(jwt: string) {
	let store = {};
	spyOn(localStorage, 'getItem').and.callFake(function (key){
		return store[key];
	});
	spyOn(localStorage, 'setItem').and.callFake(function (key, value){
		return store[key] = value;
	});
	localStorage.setItem('jwt', JSON.stringify(jwt));
	return jwt;
}