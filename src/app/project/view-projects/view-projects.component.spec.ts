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

fdescribe('ViewProjectsComponent', () => {
  let component: ViewProjectsComponent;
  let fixture: ComponentFixture<ViewProjectsComponent>;
  let router: Router;

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
   * Test allUsers is role is ADMIN will set userPage, projectPage,and userProject
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
   */
  it('should verify userPage and projectPage are falsy and userProjectsPage is truthy', () =>{
    component.usersPage = true;
    component.projectsPage = true;
    component.userProjectsPage = false;

    component.yourProjects();
    expect(component.usersPage).toBeFalsy();
    expect(component.projectsPage).toBeFalsy();
    expect(component.userProjectsPage).toBeTruthy();

  })

  /**
   * Test isolated routing and check if the 
   */
  xit('should test mock navigation ',() =>{

    let navigateSpy = spyOn(router,'navigate').and.callThrough();
    component.submitProject();
    expect(navigateSpy).toHaveBeenCalledWith(['/project_submission'])
   })
});
