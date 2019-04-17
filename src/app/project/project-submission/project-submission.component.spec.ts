import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { ProjectSubmissionComponent } from './project-submission.component';
import { AppModule } from 'src/app/app.module';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

/**
 * This test suite serves to check the proper creation of the ProjectSubmission
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('ProjectSubmissionComponent', () => {
  let component: ProjectSubmissionComponent;
  let fixture: ComponentFixture<ProjectSubmissionComponent>;
  let router: Router;
  let service: UserService;
  let testUser: User


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubmissionComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * testing that when the project submission component is rendered, if the user is null
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
   * Test ngOnit if userService.getUser is not null
   * 
   * @author Gabriel Zapata, Alex Johnson (010719-Java-Spark-USF)
   * 
   */
  it('should verify ngOninit fields if userService.getUser is not null',()=>{
    let testUser: User;
    testUser ={
      username:'testUsername',
      password:'testPassword',
      firstName: 'testFirstName',
      lastName: 'testLastName',
      role:'test'
    }
    service.user = testUser;
    
    spyOn(service,'getUser').and.returnValue(testUser);

    component.ngOnInit();
 
    expect(component.projectToUpload.groupMembers).toBeTruthy();
  
  })

   /**
    * Test openDialog with event listener = inputGroupMembers
    *
   * @author Gabriel Zapata (010719-Java-Spark-USF)
   * 
   */
  it('should verify openDialog fields, and title, questiontype, ',()=>{
    
    let event = {
      target : {
        id :'inputGroupMembers'
      }
    }

    component.openDialog(event);

    expect(component.title).toContain('New Group Member')
    expect(component.questionType).toContain('Enter the name of the group member')

  })

   /**
    * Test openDialog with event listener = inputGroupMembers
    *
   * @author Gabriel Zapata (010719-Java-Spark-USF)
   * 
   */
  it('should verify openDialog fields, and title, questiontype, ',()=>{
    
    let event = {
      target : {
        id :'notInputGroupMembers'
      }
    }

    component.openDialog(event);

    expect(component.title).toContain('Repository Link')
    expect(component.questionType).toContain('Enter the Github URL of your repository')

  })

   /**
     * Test openEditableDialog with event listener = inputGroupMember
     * 
    * @author Gabriel Zapata (010719-Java-Spark-USF)
   */
  it('should verify openEditableDialog fields if id is not inputGroupMembers',()=>{
    let event = {
      target : {
        id :'inputGroupMembers'
      }
    }

    component.openEditableDialog(event);

    expect(component.title).toContain('New Group Member')
    expect(component.questionType).toContain('Enter the name of the group member')
    expect(component.width).toEqual(300);
    
  })

    /**
     * Test openEditableDialog with event listener = inputGroupMember
     * 
    * @author Gabriel Zapata | Slavik Cool-Guy (010719-Java-Spark-USF)
   */
  it('should verify openEditableDialog fields if id is not inputGroupMembers',()=>{
    let event = {
      target : {
        id :'notInputGroupMembers'
      }
    }

    component.openEditableDialog(event);

    expect(component.title).toContain('Repository Link')
    expect(component.questionType).toContain('Enter the Github URL of your repository')
    expect(component.width).toEqual(500);
    
  })

    /**
     * Test openEditableDialog with event listener = inputGroupMember
     * 
    * @author Gabriel Zapata is an awesime guy (010719-Java-Spark-USF)
   */
  it('should verify openEditableDialog fields if id is inputGroupMembers',()=>{
    let id = 'inputGroupMembers';
    let event = {
      target: id
    }
    
    component.openEditableDialog(event);

    expect(component.title).toBeTruthy();
    expect(component.questionType).toBeTruthy();
    expect(component.width).toBeTruthy();
  })

  /**
   * Test submitForm formData
   * 
   * @author Gabriel Zapata (010719-Java-Spark-USF)
   */
  it('should test submitForm ',() =>{
    component.projectToUpload = {
      groupMembers : ['testGroupMember'],
      screenShots :  ['testScreenShots'],
      zipLinks : ['testZip'],
    }
    component.projectToUpload.groupMembers = ['test'];
    component.submitForm();
    expect(component.submitting).toBeTruthy();
    
  })

    /**
     * Test openEditableDialog with event listener = inputGroupMember
     * 
    * @author Gabriel Zapata (010719-Java-Spark-USF)
   */  
    it('should test stuff',()=>{

      let event = {
        target : {
          files :'test'
        }
      }
      component.projectToUpload ={
        screenShots: ['test']
      }

      component.onFileSelected(event);

      expect(component.validScreenshots).toBeTruthy();
    })
});
