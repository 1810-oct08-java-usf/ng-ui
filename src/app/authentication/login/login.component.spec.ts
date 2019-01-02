import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';

import { LoginComponent } from './login.component';
import { UserService } from '../../core/services/user.service';
import { AuthenticationModule } from '../authentication.module';
import { By } from '@angular/platform-browser';

/**
 * This test suite serves to check the proper creation of the Login
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        AppModule,
        AuthenticationModule],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Testing that the component was properly created
  it('should create', () => {
    expect(component).toBeTruthy();
  });



  /**
   * Testing the fuctionality of the login method
   */
  it('should make a call to the UserService', () => {

    // Arrange the login environment
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);

    // Spy on the user service login method
    const serviceSpy = spyOn(userService, 'login').and.callThrough();

    component.login();

    // the user service login method should be called
    expect(serviceSpy).toHaveBeenCalled();
  });


  /**
   * Testing the fuctionality of the login method,
   * Specifically button click event, which call the login
   * methods in both the Login Component and the User service
   */
  it('Login button click should make a call to the UserService', () => {

    // Arrange
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);
    const serviceSpy = spyOn(userService, 'login').and.callThrough(); // Spy on the user service login method

    const loginElement = fixture.debugElement.query(By.css('form')); // Capture the template for inside of a variable for mocking
    component.user.firstName = 'Admin'; // Mock up the username input field
    component.user.lastName = 'Testing'; // Mock up the password input field

    // Act
    fixture.detectChanges();
    loginElement.nativeElement[2].click(); // Simulate a button click

    // Assert
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should render \'Login\' in title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.textContent).toContain('Login');
  })

});
