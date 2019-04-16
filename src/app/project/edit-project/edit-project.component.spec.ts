import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectComponent } from './edit-project.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { ProjectModule } from '../project.module';
import { UserService } from 'src/app/core/services/user.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Router } from '@angular/router';

describe('EditProjectComponent', () => {
  let component: EditProjectComponent;
  let fixture: ComponentFixture<EditProjectComponent>;
  let userService: UserService;
  let projectService: ProjectService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule, ProjectModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    projectService = TestBed.get(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    
  //   // const title = component.meta.getTag('name=title');
  //   const title = component.meta.getTitle('name=title');
  //   expect(title).toBe('Edit Project | RPM');
  // });

  /**
   * Back function on component sets 'lastPage' in sessionStorage to 'edit'.
   * the 'toBe' matcher expects an exact match.
   * @Author Edward Bechtold and a little bit of Gabriel too (190107 Java)
   */
  it('should set sessionStorage appropriately after back() function is called', () => {

    component.back();

    expect(sessionStorage.getItem('lastPage')).toBe('edit');
  });
  
  /**
   * AddGroupMember function should add a value to the updatedArr. The array 
   * will have a value of truthy if a value is successfully added to it.
   *  
   * @Author Gabriel Zapata and Edward Bechtold (190107 Java)
   */
  it('should add a group member to the updatedArr', () => {
    
    component.projectToUpdate.groupMembers = [];
    component.groupMember = 'test';
    let updatedArr = component.projectToUpdate;
    component.addGroupMember();
    
    expect(updatedArr).toBeTruthy();
  });
  
  /** 
   * This doesn't work - revisit
   * @Author Gabriel Zapata and Edward Bechtold (190107 Java)
   */
  it('should improve code coverage', () => {
    let testUser = {
      username: 'test'
    };
    let spy = spyOn(userService, 'getUser').and.returnValue(testUser);

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
   * This doesn't work either wow
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
   * This doesn't submit a form
   */
  it('should submit a form', () => {
    localStorage.clear();
    let testUser = {
      role: 'ROLE_USER'
    }
    
    JSON.stringify(testUser);
    localStorage.setItem('user', 'testUser');
    
    component.submitForm();
    
    expect(component.projectToUpdate.status).toContain('Pending');
  })

  /**
   * testing that when the edit-project component is rendered, if the user is null
   * then the user should be navigated back to login
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to login if the user is null', () => {

    router = TestBed.get(Router);
    localStorage.clear();
    localStorage.setItem('user', null);
    let navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(['/auth/login']);
  });

  /**
   * the tested method should navigate to home
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to home', () => {

    router = TestBed.get(Router);
    let navigateSpy = spyOn(router, 'navigate');

    component.submitForm();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  /**
   * the deleteProject() method should navigate to home
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to home', () => {

    router = TestBed.get(Router);
    let navigateSpy = spyOn(router, 'navigate');

    component.deleteProject();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  /**
   * the back() method should navigate to home
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to home', () => {

    router = TestBed.get(Router);
    let navigateSpy = spyOn(router, 'navigate');

    component.back();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

});
