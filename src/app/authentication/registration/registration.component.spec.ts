import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';

import { RegistrationComponent } from './registration.component';
import { AuthenticationModule } from '../authentication.module';
import { UserService } from 'src/app/core/services/user.service';
import { By } from '@angular/platform-browser';

/**
 * This test suite serves to check the proper creation of the registration
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */


// Testing the successful creation of the Registration component
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule, AuthenticationModule],
      providers: [UserService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Testing the successful creation of the registration componenet
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Test component's call to the user service ts file
  it('Should call service level register method', () => {

    // Arrange
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);
    const serviceSpy = spyOn(userService, 'register').and.callThrough(); // Set a spy on the service class

    // Act
    component.register();

    // Assert
    expect(serviceSpy).toHaveBeenCalledTimes(1);
  });


  /**
   * Testing the fuctionality of the registration components
   * button click event. Upon a succesful form submission, the button click,
   * should trigger an indirect call to user service class
   */
  it('Registration button click event should make a call to the UserService', () => {

    // Arrange the registration environment
    const debugElement = fixture.debugElement;
    const userService = debugElement.injector.get(UserService);
    const serviceSpy = spyOn(userService, 'register').and.callThrough(); // Spy on the user service login method

    // simulate a form submission
    component.user.firstName = 'Tester';
    component.user.lastName = 'Testing';
    component.user.email = 'test@revature.com';
    component.user.username = 'test';
    component.user.password = 'ing';
    const registrationElement = fixture.debugElement.query(By.css('[id = "registration-container"]')); // Capture the template for inside of a variable for mocking
    fixture.detectChanges();
    // Gain access to button element within the template to trigger a click event
    const button = registrationElement.nativeElement.childNodes[0].childNodes[0].childNodes[0]
                  .childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[0].childNodes[0]
                      .childNodes[2].childNodes[1];
    button.click(); // Simulate a button click

    // the user service register method should be called with the passed credentials
    expect(serviceSpy).toHaveBeenCalled();
  });
});
