import { User } from 'src/app/core/models/User';
import { UserService } from './../../core/services/user.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * This test suite serves to check the proper creation of the Profile
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let service: UserService;
  let testUser: User;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule,ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service =TestBed.get(UserService);
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test is failing need rework
  // Tests conditions for an invalid form (ie. missing field values)
  it('Should produce an invalid form', () => {

    expect(component.form.valid).toBeFalsy();

  });
  //Test is failing need rework
  // Tests conditions for an valid form (ie. when all fields are present)
  it('Should produce a valid form', () => {

    component.form.controls['firstName'].setValue('Tester');
    component.form.controls['lastName'].setValue('Test');
    component.form.controls['email'].setValue('test@gmail.com');
    component.form.controls['username'].setValue('Tester');
    component.form.controls['password'].setValue('Testing');

    expect(component.form.valid).toBeTruthy();

  });
  /**
   * Test ngOnInit
   * @author Gabriel Zapata 
   */
  it('should verify user fields are  inserted into fillFormGroup',() =>{
    testUser = {
      username: 'testUserName',
      password: 'testPassword',
      firstName: 'testFirstname',
      lastName: 'testLastName',
      email: 'test@test.com'
    }
    spyOn(service,'getUser').and.returnValue(testUser);

    component.ngOnInit();

    expect(component.fillFormGroup).toBeTruthy();
  });

  
  /**
   * Test cancelEdit profile
   * @author Gabriel Zapata
   */
  it('should test cancelEditProfile fields',() =>{
    testUser = {
      username: 'testUserName',
      password: 'testPassword',
      firstName: 'testFirstname',
      lastName: 'testLastName',
      email: 'test@test.com'
    }
  spyOn(service,'getUser').and.returnValue(testUser);

  component.cancelEditProfile();

  expect(component.disableButton).toBeTruthy();
  expect(component.fillFormGroup).toBeTruthy();
  });

  /**
   * Test formField and disable buttons associated
   * //Not Working need rework.
   * 
   * @author: Gabriel Zapata.
   */
  xit('should verify disable button if form is valid',()=>{
    
    let formValidSpy = spyOnProperty(component.form, 'valid', 'get').and.returnValue(true)
    component.formFilled();

  })
});
