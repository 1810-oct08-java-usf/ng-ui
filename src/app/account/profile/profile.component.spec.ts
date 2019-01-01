import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';
import { ProfileComponent } from './profile.component';

/**
 * This test suite serves to check the proper creation of the Profile
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
xdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // Tests conditions for an invalid form (ie. missing field values)
  it('Should produce an invalid form', () => {

    component.form.controls['firstName'].setValue('');
    component.form.controls['lastName'].setValue('');
    component.form.controls['email'].setValue('Test@revature.com');
    component.form.controls['username'].setValue('Tester');
    component.form.controls['password'].setValue('Testing');

    expect(component.form.valid).toBeFalsy();

  });

  // Tests conditions for an valid form (ie. when all fields are present)
  it('Should produce a valid form', () => {

    component.form.controls['firstName'].setValue('Tester');
    component.form.controls['lastName'].setValue('Test');
    component.form.controls['email'].setValue('Test@revature.com');
    component.form.controls['username'].setValue('Tester');
    component.form.controls['password'].setValue('Testing');

    expect(component.form.valid).toBeTruthy();
  });
});
