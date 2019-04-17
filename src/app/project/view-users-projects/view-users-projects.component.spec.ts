import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { ViewUsersProjectsComponent } from './view-users-projects.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/core/models/Project';
import { User } from 'src/app/core/models/User';
import { of } from 'rxjs';



/**
 * This test suite serves to check the proper creation of the ViewProjects
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 * @author Ryan Williams | Michael Grammens | (1810-Oct22-Java-USF)
 */

describe('ViewUsersProjectsComponent', () => {
  let component: ViewUsersProjectsComponent;
  let fixture: ComponentFixture<ViewUsersProjectsComponent>;
  let router: Router;
  let userService: UserService;
  let projectService: ProjectService;
  let projectServiceSpy: {getAllProjects : jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
    projectService = TestBed.get(ProjectService);
    projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getAllProjects']);
 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify currentUser is userService.getUser if currentUser is not null', () => {
    let testUser1: User;
    testUser1 = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      role: "ROLE_USER"
    }
    let testUser2: User;
    testUser2 = {
      firstName: 'testFirstName2',
      lastName: 'testLastName2'
    }
    component.currentUser = testUser2;

    let testProject1: Project;
    testProject1 = {
      name: 'testProjectName'
    }

    component.subscription ;
    
    spyOn(userService, 'getUser').and.returnValue(testUser1)
    projectServiceSpy.getAllProjects.and.returnValue(of(testProject1));

    component.ngOnInit();

    expect(component.currentUser).toBe(testUser1);
    expect(component.subscription).toBeTruthy();
 
  })

   /**
   * the tested method should navigate to /edit
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should navigate to edit', () => {

    let testProject: Project;
    testProject = {
      id: 1
    }
    let navigateSpy = spyOn(router, 'navigate');

    component.edit(testProject);

    expect(navigateSpy).toHaveBeenCalledWith([testProject.id + '/edit']);
  })

  /**
   * the tested method should navigate to /codebase
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should navigate to codebase', () => {

    let testProject: Project;
    testProject = {
      id: 1
    }
    let navigateSpy = spyOn(router, 'navigate');

    component.codebase(testProject);

    expect(navigateSpy).toHaveBeenCalledWith(['/codebase']);
  });

  /**
  * Test nextImage method and previousImage fields with testTotalAmountOfScreenShots = 1 
  * 
  * @author Gabriel Zapata (190107-Java-Spark-USF)
  */
 it('should verify previousImage method is modified by parameter testTotalAmountOfScreenShots, result should be equal to testTotalAmountOfScreenShots if imagePage is less than 0', () => {

  component.imagePage = 0;

  let testTotalAmountOfScreenShots = 1;
  component.previousImage(testTotalAmountOfScreenShots);

  expect(component.imagePage).toEqual(testTotalAmountOfScreenShots);
});

  /**
   * Test nextImage method and imagePage fields with testTotalAmountOfScreenShots = 1 
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify nextImage method is modified by parameter testTotalAmountOfScreenShots. Result should be 0', () => {

    component.imagePage = 0;

    let testTotalAmountOfScreenShots = 1;
    component.nextImage(testTotalAmountOfScreenShots)

    expect(component.imagePage).toEqual(0);
  });

  /**
   * the tested method should canEdit fields Currentuser.role is RoleAdmin
   * 
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should test canEdit fields if currentUser.role is equal to RoleAdmin', () => {
    let project: Project
    component.currentUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      role: 'ROLE_ADMIN'
    }
    project = {
      trainer: 'testProjectTrainer'
    }
    component.canEdit(project)
    expect(component.trainerCanEdit).toBeTruthy();
  });

  /**
 * the tested method should canEdit fields where current user full name equals project trainer name
 *  
 * @author Gabriel Zapata (190107-Java-Spark-USF)
 */
  it('should test canEdit fields if currentUser full name is equal to project.Trainer', () => {
    let project: Project
    component.currentUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      role: 'ROLE_ADMIN'
    }
    project = {
      trainer: 'testFirstName testLastName'
    }
    component.canEdit(project)
    expect(component.trainerCanEdit).toBeTruthy();
  });

  /**
  * Tested method canEdit fields when Currentuser.role not RoleAdmin
  * 
  * @author Gabriel Zapata (190107-Java-Spark-USF)
  */
  it('should test canEdit fields if currentUser.role is equa not to RoleAdmin', () => {
    let project: Project
    component.currentUser = {
      firstName: 'testFirstName',
      lastName: 'testLastName',
      role: 'NOT_ROLE_ADMIN'
    }
    project = {
      trainer: 'testProjectTrainer'
    }
    component.canEdit(project)
    expect(component.trainerCanEdit).toBeFalsy();
  });
});
