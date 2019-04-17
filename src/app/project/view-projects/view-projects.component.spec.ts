import { User } from './../../core/models/User';
import { UserService } from './../../core/services/user.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { ViewProjectsComponent } from './view-projects.component';
import { Router } from '@angular/router';

/**
 * This test suite serves to check the proper creation of the ViewProjects
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */

describe('ViewProjectsComponent', () => {
  let component: ViewProjectsComponent;
  let fixture: ComponentFixture<ViewProjectsComponent>;
  let router: Router;
  let service:UserService;
  let testUser:User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be usersPage=false', () => {
    fixture.componentInstance.projects();
    expect(fixture.componentInstance.usersPage).toEqual(false)
  })

  it('should be projectsPage=true', () => {
    fixture.componentInstance.projects();
    expect(fixture.componentInstance.projectsPage).toEqual(true)
  })
  /**
   * Test ngOnit with current user with sessionStorage equal to 'lastPage' and role of ADMIN
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify sessionstorage is clear, tab = 1 and yourProject is called ',() =>{
    testUser = {
     role:'ROLE_ADMIN'
    }
    spyOn(service,'getUser').and.returnValue(testUser);
    sessionStorage.setItem('lastPage', 'project_Submit');
    spyOn(component,'yourProjects').and.callThrough();
    
    component.ngOnInit();

    expect(sessionStorage.getItem('lastPage')).toBeFalsy();
    expect(component.tab).toEqual(1);
    expect(component.yourProjects).toHaveBeenCalledTimes(1);
 
  })
   /**
    * Test ngOnit with current user with sessionStorage equal to 'project_Submit' role of NOT ADMIN
    * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify sessionstorage is clear, tab = 1 and yourProject is called ',() =>{
    testUser = {
     role:'test'
    }
    spyOn(service,'getUser').and.returnValue(testUser);
    sessionStorage.setItem('lastPage', 'project_Submit');
    spyOn(component,'yourProjects').and.callThrough();
    
    component.ngOnInit();

    expect(sessionStorage.getItem('lastPage')).toBeFalsy();
    expect(component.tab).toEqual(0);
    expect(component.yourProjects).toHaveBeenCalledTimes(1);
 
  })
  /**
   * Test ngOnit with current user with sessionStorage equal to 'edit' and role of ADMIN
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify sessionstorage is clear, tab = 2 and yourProject is called ',() =>{
    testUser = {
     role:'ROLE_ADMIN'
    }
    spyOn(service,'getUser').and.returnValue(testUser);
    sessionStorage.setItem('lastPage', 'edit');
    spyOn(component,'projects').and.callThrough();
    
    component.ngOnInit();

    expect(sessionStorage.getItem('lastPage')).toBeFalsy();
    expect(component.tab).toEqual(2);
    expect(component.projects).toHaveBeenCalledTimes(1);
 
  })
   /**
    * Test ngOnit with current user with sessionStorage equal to 'edit' and role of NOT ADMIN
    * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify sessionstorage is clear, tab = 0 and yourProject is called ',() =>{
    testUser = {
     role:'test'
    }
    spyOn(service,'getUser').and.returnValue(testUser);
    sessionStorage.setItem('lastPage', 'edit');
    spyOn(component,'yourProjects').and.callThrough();
    
    component.ngOnInit();

    expect(sessionStorage.getItem('lastPage')).toBeFalsy();
    expect(component.tab).toEqual(0);
    expect(component.yourProjects).toHaveBeenCalledTimes(1);
 
  })

  /**
   * Test ngOnit with current user role of NOT ADMIN
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify tab = 0 and yourProject is called once ',() =>{
    testUser = {
     role:'test'
    }
    spyOn(service,'getUser').and.returnValue(testUser);
    spyOn(component,'yourProjects').and.callThrough();
    
    component.ngOnInit();

    expect(component.tab).toEqual(0);
    expect(component.yourProjects).toHaveBeenCalledTimes(1);
 
  })



  /**
   * Test allUsers is role is ADMIN will set userPage, projectPage,and userProject
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify userPage is truthy, and projectPage, and userProjectPage to be falsy, if currentUser role is ADMIN',() =>{
    component.currentUser = {
      role: "ROLE_ADMIN"
    }
    component.usersPage = false;
    component.projectsPage = true; 
    component.userProjectsPage = true;

    component.allUsers();

    expect(component.usersPage).toBeTruthy();
    expect(component.projectsPage).toBeFalsy();
    expect(component.userProjectsPage).toBeFalsy();
    
  })
  /**
   * Test allUsers role is not ADMIN and verify if yourproject method is called
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify if yourProject method is called if role isnotADMIN in alluser method',()=>{
    component.currentUser = {
      role: "test"
    }
    spyOn(component,'yourProjects').and.callThrough();
    component.allUsers();

    expect(component.yourProjects).toHaveBeenCalledTimes(1);
  })

  /**
   * Test projects fields userPage, projectPage,and userProjectsPage
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify userPage,and userProjectsPage to be falsy, and projectsPage to be truthy', () =>{
    component.usersPage = true;
    component.projectsPage = false;
    component.userProjectsPage = true;
    
    component.projects();

    expect(component.usersPage).toBeFalsy();
    expect(component.projectsPage).toBeTruthy();
    expect(component.userProjectsPage).toBeFalsy();
   })

  /**
   * Test yourProject fields userPage, projectpage and userProjectPage
   * @author Gabriel Zapata (190107-Java-Spark-USF)
   */
  it('should verify userPage and projectPage are falsy and userProjectsPage is truthy', () =>{
    component.usersPage = true;
    component.projectsPage = true;
    component.userProjectsPage = false;

    component.yourProjects();
    expect(component.usersPage).toBeFalsy();
    expect(component.projectsPage).toBeFalsy();
    expect(component.userProjectsPage).toBeTruthy();

  });

   /**
   * the tested method should navigate to project_submission
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to project_submission', () => {

    router = TestBed.get(Router);
    let navigateSpy = spyOn(router, 'navigate');

    component.submitProject();

    expect(navigateSpy).toHaveBeenCalledWith(['/project_submission']);
  });
});
