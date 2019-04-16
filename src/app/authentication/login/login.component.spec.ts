import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';
import { LoginComponent } from './login.component';
import { UserService } from '../../core/services/user.service';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { By } from '@angular/platform-browser';
import { User } from 'src/app/core/models/User';
import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core';
/**
 * This test suite serves to check the proper creation of the Login
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
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
    userService =TestBed.get(UserService);
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

    component.usernameO = false;
    component.passwordO = false;
    component.authenticating = false;
    component.loggedIn = false;
    component.logSuccess = true;
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

  /**
   * This test suite serves to check the functionality
   * of the various methods within it.
   * @author Fadi Alzoubi
   */

  it('Check the initialization values of login component ', () => {
    let testUser = {
      username: "test",
      password: "testpassword"
    };

    //spyOn(userService,"login").and.returnValue(testUser);
    // expect(component.user).toBe(testUser);
    component.login();
    expect(component.usernameO).toBeFalsy;
    expect(component.passwordO).toBeFalsy;
    expect(component.authenticating).toBeFalsy;
    expect(component.loggedIn).toBeFalsy;
    expect(component.logSuccess).toBeFalsy;
  });

  //Check login method 
  xit("Check login properties", () => {
    component.login();
    // //if true(user)
    // expect( component.login()).toHaveBeenCalled();
    expect(this.userService.login().authenticating).toBeTruthy();
    expect(this.userService.login().if(true).authenticating).toBeFalsy();
    expect(this.userService.login().if(true).loggedIn).toBeTruthy();
    expect(this.userService.login().if(true).router.nvigate).toBeDefined();
    //else
    expect(this.userService.login().if(false).authenticating).toBeFalsy();
    expect(this.userService.login().if(false).logSuccess).toBeFalsy();
    //Error
    expect(this.userService.login().console.error().authenticating).toBeFalsy;
    expect(this.userService.login().console.error().logSuccess).toBeFalsy;
  });

  /**
  * @author Gabriel Zapata
  *Test will verify if username is truthy then loginE will return usernameO as false 
  **/
  it("should verify usernameO are false if username is fasley", () => {

    component.user = {
      username: "testUserName"
    }
    component.loginE();

    expect(component.usernameO).toBeFalsy();
  });
  /**
  * @author Gabriel Zapata
  *Test will verify if username is falsy then loginE will return usernameO as true 
  **/
  it("should verify usernameO is true if username is truthy", () => {

    component.user = {
      username: ""
    }
    component.loginE();

    expect(component.usernameO).toBeTruthy();
  });
  /**
  * @author Gabriel Zapata
  *Test will verify if password is falsy then loginE will return passwordO as true 
  **/
  it("should verify passwordO is true if password is falsy", () => {

    component.user = {
      username: "",
      password: ""
    }
    component.loginE();

    expect(component.passwordO).toBeFalsy();
  });
  /**
    * @author Gabriel Zapata
    *Test will verify if password is truthy then loginE will return passwordO as false 
    **/
  it("should verify passwordO is true if password is falsy", () => {

    component.user = {
      username: "testUsername",
      password: "testPassword"
    }
    component.loginE();

    expect(component.passwordO).toBeFalsy();
  });
  /**
   * @author Gabriel Zapata
   *Test will verify if password is truthy then loginE will return passwordO as false 
   **/
  it("should verify passwordO is true if password is falsy", () => {

    component.user = {
      username: "testUsername",
      password: "testPassword"
    }

    component.loginE();


    expect(component.authenticating).toBeTruthy();
    expect(component.loggedIn).toBeFalsy();
  });
 it('should test checkEP() event ')

});
