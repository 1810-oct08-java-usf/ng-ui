import { async, ComponentFixture, TestBed, fakeAsync } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "../../shared/shared.module";
import { AppModule } from "../../app.module";
import { RegistrationComponent } from "./registration.component";
import { AuthenticationModule } from "../authentication.module";
import { UserService } from "src/app/core/services/user.service";
import { By } from "@angular/platform-browser";
import { parse } from "path";
import { of, Observable } from 'rxjs';
//import 'rxjs/add/observable/of';
/**
 * This test suite serves to check the proper creation of the registration
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */

 //-----

// Testing the successful creation of the Registration component
describe("RegistrationComponent", () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userService: UserService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        AppModule,
        AuthenticationModule
      ],
      providers: [UserService]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    //fixture.detectChanges();
  });
  // Testing the successful creation of the registration componenet
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  // Test component's call to the user service ts file
  it("Should call service level register method", () => {
    // Arrange
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);
    const serviceSpy = spyOn(userService, "register").and.callThrough(); // Set a spy on the service class
    // Act
    component.register();
    // Assert
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });
  /**
   * Testing the fuctionality of the registration components
   * button click event. Upon a successful form submission, the button click,
   * should trigger an indirect call to user service class
   */
  it('Registration button click event should make a call to the UserService', () => {
    // Arrange the registration environment
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);
    const serviceSpy = spyOn(userService, "register").and.callThrough(); // Spy on the user service register method
    // simulate a form submission
    component.user.firstName = "Tester";
    component.user.lastName = "Testing";
    component.user.email = "test@revature.com";
    component.user.username = "test";
    component.user.password = "ing";
    const registrationElement = fixture.debugElement.query(
      By.css('[id = "registration-container"]')
    ); // Capture the template for inside of a variable for mocking
    fixture.detectChanges();
    // Gain access to button element within the template to trigger a click event
    const button =
      registrationElement.nativeElement.childNodes[0].childNodes[0]
        .childNodes[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1]
        .childNodes[0].childNodes[0].childNodes[2].childNodes[1];
    button.click(); // Simulate a button click
    // the user service register method should be called with the passed credentials
    expect(serviceSpy).toHaveBeenCalled();
  });
  /**
   * This test should verify regitering is false, authentication is true, loginUser username
   * and loginUser password is set to user when user is inserted to userService.register method
   */
  
  it("should verify registering, authenticating, loginUser username and password when userService.register is called", () => {
    let testUser = {
      username: "test",
      password: "testpassword"
    };

    spyOn(userService, "register").and.returnValue(testUser);
    component.register();
    expect(component.registering).toBeFalsy;
    expect(component.authenticating).toBeTruthy;
    expect(component.loginUser.username).toEqual(testUser.username);
    expect(component.loginUser.password).toEqual(testUser.password);
    
  });

  /** 
   * should test the initialization values in checkIfEmailIsInUse method
   * 
   * @author Fadi Alzoubi (190107-Java-Spark-USF)
   */
  it("should test the initialization values in checkIfEmailIsInUse method ",
   () => {
      component.user.email = 'testEmail';
      component.checkIfEmailIsInUse(); 
      expect(component.emailToCheck).toBe('testEmail');
      expect(component.emailIsAvailable).toBeFalsy();
      expect(component.emailIsNotAvailable).toBeFalsy();
      expect(component.checkingIfEmailIsInUse).toBeTruthy();
  });


  it("should check the checkIfEmailIsInUse (result if) checkingIfEmailIsInUse , emailIsAvailable, ", () => {
    
    let spy = spyOn(userService,'checkIfEmailIsInUse').apply('testEmail');
  
    component.checkIfEmailIsInUse();
    expect(spy).toBeTruthy();
    expect(component.checkIfEmailIsInUse).toBeFalsy();
    expect(component.emailIsAvailable).toBeTruthy();
    
  });


  it("should check the checkIfEmailIsInUse (result else) checkingIfEmailIsInUse,and emailIsNotAvailable", () => {
   
    component.checkIfEmailIsInUse();
    expect(component.checkingIfEmailIsInUse).toBeFalsy();
    expect(component.emailIsNotAvailable).toBeTruthy();

  });

  it("should check the checkIfEmailIsInUse (error) checkingIfEmailIsInUse,and emailIsNotAvailable", () => {
   
    expect(component.checkIfEmailIsInUse()).toThrow("error");
    expect(component.checkingIfEmailIsInUse).toBeTruthy;
    expect(component.emailIsNotAvailable).toBeFalsy;

  });

  /**
   * This test should check username available checkIfUsernameIsAvailable method
   */

  it("should check the properties of checkIfUsernameIsAvailable method values of usernameToCheck, emailIsAvailable, emailIsNotAvailable, checkingIfEmailIsInUse ",() => {
    
    component.usernameToCheck = 'usernamecheck'
    component.user.username = 'username';
    component.checkIfUsernameIsAvailable(); 
  
  
    expect(component.usernameToCheck).toBe('usernamecheck');
    expect(component.usernameIsAvailable).toBeFalsy();
    expect(component.usernameIsNotAvailable).toBeFalsy();
    expect(component.checkingIfUsernameIsAvailable).toBeTruthy();

  });
  it("should check the properties of checkIfUsernameIsAvailable method values of usernameToCheck, emailIsAvailable, emailIsNotAvailable, checkingIfEmailIsInUse ", fakeAsync(() => {
    
    component.usernameToCheck = 'usernamecheck'
    component.user.username = 'username';
 
    let result = true;
   let spy = spyOn(userService,'checkIfUsernameIsAvailable').and.callFake(() =>{
    
    return of(result);

    })
   component.checkingIfUsernameIsAvailable=false;
    component.checkIfUsernameIsAvailable();

    expect(spy).toEqual(true);
    expect(component.checkingIfUsernameIsAvailable).toBeFalsy();
    expect(component.usernameIsAvailable).toBeTruthy();
  }));


  it("should check the usernameIsAvailable (result if) checkingIfUsernameIsAvailable, usernameIsAvailable",() => {
     let spy = spyOn(this.userService, 'checkIfUsernameIsAvailable')
    .and.returnValue(true);
    component.checkIfUsernameIsAvailable(); 
    expect(spy).toBeTruthy();
    expect(component.checkingIfUsernameIsAvailable).toBeFalsy();
    expect(component.usernameIsAvailable).toBeTruthy();
    
  });

  it("should check the usernameIsAvailable (result else) checkingIfUsernameIsAvailable, usernameIsNotAvailable",() => {
    let spy = spyOn(this.userService, 'checkIfUsernameIsAvailable').and.returnValue(false);
    component.checkIfUsernameIsAvailable(); 
    expect(spy).toBeFalsy();
    expect(component.checkingIfUsernameIsAvailable).toBeFalsy();
    expect(component.usernameIsNotAvailable).toBeTruthy();
   
  });

  it("should check the usernameIsAvailable (error) checkingIfUsernameIsAvailable, usernameIsNotAvailable", () => {
    component.checkIfUsernameIsAvailable(); 
    expect(component.checkIfUsernameIsAvailable()).toThrow("error");
    expect(component.checkingIfUsernameIsAvailable).toBeFalsy();
    expect(component.usernameIsNotAvailable).toBeTruthy();
    
  });

  it("Should check the properties of checkIfEmailIsInUseKey method values of emailToCheck, emailIsAvailable, emailIsNotAvailable, checkingIfEmailIsInUse", (done) => {

    component.user.email = 'testEmail';
    component.checkIfEmailIsInUseKey();
 
    setTimeout(() => {
      expect(component.emailToCheck).toBe('testEmail');
      expect(component.emailIsAvailable).toBeFalsy();
      expect(component.emailIsNotAvailable).toBeFalsy();
      expect(component.checkingIfEmailIsInUse).toBeTruthy();
 
      done();
    }, 1000);
  });
 
  it("Should check the properties of checkIfUsernameIsAvailableKey method values of usernameToCheck, usernameIsAvailable, usernameIsNotAvailable, checkIfUsernameIsAvailable", (done) => {
 
    component.user.username = 'testName';
    component.checkIfUsernameIsAvailableKey();
 
    setTimeout(() => {
      expect(component.usernameToCheck).toBe('testName');
      expect(component.usernameIsAvailable).toBeFalsy();
      expect(component.usernameIsNotAvailable).toBeFalsy();
      expect(component.checkIfUsernameIsAvailable).toBeTruthy();
 
      done();
    }, 1000);
  });
});