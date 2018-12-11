import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';

import { LoginComponent } from './login.component';
import { UserService } from '../../core/services/user.service';
import { DebugElement, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationModule } from '../authentication.module';
import { By } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

/** 
 * This test suite serves to check the proper creation of the Login
 * component as well the as well as the functionality 
 * of the various methods within it.
 * @param null
 * @author Ryan Beevers| Shawn Bickle | Sahil Makhijani| Andrew Mitchem | Yuki Mano |Jeffly Luctamar| (1810-Oct08-Java-USF)
 * 
 * */

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

  //Testing that the component was properly created
  it('should create', () => {
    expect(component).toBeTruthy();
  });



  /**
   * Testing the fuctionality of the login method
   */
  it('should make a call to the UserService',  () =>{
  
    //Arrange the login environment
    const debugElement = fixture.debugElement;
    let userService = debugElement.injector.get(UserService);
    
    //Spy on the user service login method
    let serviceSpy = spyOn(userService, 'login' ).and.callThrough();
    
    component.login();
    
    //the user service login method should be called 
    expect(serviceSpy).toHaveBeenCalled();
  });


  /**
   * Testing the fuctionality of the login method,
   * Specifically button click event, which call the login
   * methods in both the Login Component and the User service  
   */
  it('Login button click should make a call to the UserService', () =>{
     
    //Arrange
    let debugElement = fixture.debugElement;
    let userService = debugElement.injector.get(UserService);
    let serviceSpy = spyOn(userService, 'login').and.callThrough(); //Spy on the user service login method
    
    const loginElement = fixture.debugElement.query(By.css('form')); //Capture the template for inside of a variable for mocking
    component.user.firstName = "Admin"; //Mock up the username input field
    component.user.lastName = "Testing"; //Mock up the password input field


    //Act
    fixture.detectChanges();
    loginElement.nativeElement[2].click(); //Simulate a button click
      

    //Assert
    expect(serviceSpy).toHaveBeenCalled();     
      
  });


});