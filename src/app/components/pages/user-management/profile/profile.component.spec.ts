import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { ProfileComponent } from './profile.component';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/User';

fdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ],
        imports: [RouterTestingModule, BrowserAnimationsModule, 
          ReactiveFormsModule, FormsModule, AppModule],
        providers: [
          {provide:UserService, useClass:MockUserService},
          {provide: APP_BASE_HREF, useValue: '/'}],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProfileComponent);
      component = fixture.componentInstance;
    });

    afterEach(() => {
      fixture = null;
      component = null;
    });

  xit('#ProfileComponent should set up correctly', () => {
      expect(component).toBeTruthy();
    });

  it('#setReadOnly should initialize to #true', () => {
    fixture.detectChanges();
    expect(component.setReadOnly).toEqual(true);
  });

  it('#disableButton should initialize to #true', () => {
    fixture.detectChanges();
    expect(component.disableButton).toEqual(true);
  });

  it('#filledPassword should initialize to #true', () => {
    fixture.detectChanges();
    expect(component.filledPassword).toEqual(true);
  });

  it('#fillFormGroup should update the form data', () => {
    // Arrange
    const first  = 'Chicken';
    const last = 'Boo';
    const email = 'notAChicken@exceptYeah.com';
    const username = 'chickenBoo';
    const password = 'password';

    // Act
    component.fillFormGroup(first, last, email, username, password);

    //Assert
    expect(component.form.get('firstName').value).toEqual(first);
    expect(component.form.get('lastName').value).toEqual(last);
    expect(component.form.get('email').value).toEqual(email);
    expect(component.form.get('username').value).toEqual(username);
  });

  it ('should router to login if no user', () => {
    let userService = TestBed.get(UserService);
    userService.user = new BehaviorSubject<User>(null);

    router = TestBed.get(Router);
    let routerSpy = spyOn(router, 'navigate').and
      .callFake(function () {return null; });

    component.ngOnInit();
    expect(routerSpy).toHaveBeenCalledWith(['auth/login']);
  });

  it ('#MatchPassword works with matched passwords', () => {
    // Arrange
    component.fillFormGroup('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa@revature.com', 'aaaaaaaa', 'aaaaaaaa');
    component.form.controls['password'].setValue('password');
    component.form.controls['confirmPassword'].setValue('password');

     // Act
     let retVal = ProfileComponent.MatchPassword(component.form);

     // Assert
     expect(retVal).toBeNull();
  });

  it ('#MatchPassword records error with un-matched passwords', () => {
    // Arrange
    component.fillFormGroup('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa@revature.com', 'aaaaaaaa', 'aaaaaaaa');
    component.form.controls['password'].setValue('password');
    component.form.controls['confirmPassword'].setValue('catFish');

     // Act
     ProfileComponent.MatchPassword(component.form);

     // Assert
     expect(component.form.controls['confirmPassword'].errors.MatchPassword).toEqual(true);
  });

  it ('#RevatureEmail works with complying email', () => {
    // Arrange
    component.fillFormGroup('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa@revature.com', 'aaaaaaaa', 'aaaaaaaa');
    component.form.controls['email'].setValue('anEmail@email.com');

     // Act
     let retVal = ProfileComponent.RevatureEmail(component.form);

     // Assert
     expect(retVal).toBeNull();
  });

  it ('#RevatureEmail records error with non-complying email', () => {
    // Arrange
    component.fillFormGroup('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa@revature.com', 'aaaaaaaa', 'aaaaaaaa');
    component.form.controls['email'].setValue('chicken');

     // Act
     ProfileComponent.RevatureEmail(component.form);

     // Assert
     expect(component.form.controls['email'].errors.RevatureEmail).toEqual(true);
  });

  it ('#retypeConfirmPassword properly clears confirmPassword box', () => {
    // Arrange
    component.fillFormGroup('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa@revature.com', 'aaaaaaaa', 'aaaaaaaa');
    component.form.controls['confirmPassword'].setValue('ptarmigan');

    expect(component.form.controls['confirmPassword'].value).toEqual('ptarmigan');

    component.retypeConfirmPassword();

    expect(component.form.controls['confirmPassword'].value).toEqual('');
  });

  it ('#trying to make form valid', () => {
    // Arrange
    component.fillFormGroup('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa@revature.com', 'aaaaaaaa', 'aaaaaaaa');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    component.form.controls['firstName'].setValue('Michael');
    component.form.controls['lastName'].setValue('James');
    // component.form.controls['email'].setValue('admin@revature.com');
    // component.form.controls['username'].setValue('admin');
    component.form.controls['currPassword'].setValue('password');

    component.form.controls['password'].setValue('myPassword');
    component.form.controls['confirmPassword'].setValue('myPassword');

    component.formFilled();
  });

  it ('#ValidEmail works with complying email', () => {
    // Arrange
    component.fillFormGroup('aaaaaaaa', 'aaaaaaaa', 'aaaaaaaa@revature.com', 'aaaaaaaa', 'aaaaaaaa');
    component.form.controls['email'].setValue('anEmail@any.com');

     // Act
     let retVal = ProfileComponent.ValidEmail(component.form);

     // Assert
     expect(retVal).toBeNull();
  });
});
