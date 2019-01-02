import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  form: FormGroup;
  user: User;
  setReadOnly = true;
  disableButton = true;
  filledPassword = true;
  emailPattern = '^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@(revature)\.com$';

  /**
   * source: <https://scotch.io/@ibrahimalsurkhi/match-password-validation-with-angular-2>
   * Enable validation error when password is not matched with confirmPassword
   * @param AC : grab the form that uses this function's validation
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  /**
   * Enable validation error when email does not end with '@revature.com'
   * @param AC : grab the form that uses this function's validation
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  static RevatureEmail(AC: AbstractControl) {
    const email = AC.get('email').value; // to get value in input tag
    const emailPattern = '^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@(revature)\.com$'; // regex for Revature email
    if (!email.match(emailPattern)) {
      AC.get('email').setErrors({ RevatureEmail: true });
    } else {
      return null;
    }
  }

  constructor(private userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private ngmeta: NgMetaService) { }

  ngOnInit() {
    // pre-fill the profile information with logged-in user information
    this.user = this.userService.getUser();
    if (!this.user) {
      this.router.navigate(['/auth/login']);
    }
    this.ngmeta.setHead({ title: 'Profile | RPM' });
    this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);
  }

  /**
   * This function will call the user-service to update user's profile information
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  updateProfile() {
    if (this.form.valid) {
      const updatedUserInfo: User = {
        id: this.user.id,
        firstName: this.form.get('firstName').value.trim(),
        lastName: this.form.get('lastName').value.trim(),
        email: this.form.get('email').value.trim(),
        username: this.form.get('username').value.trim(),
        password: this.form.get('currPassword').value + ' ' + this.form.get('password').value,
        role: this.user.role,
      };

      this.userService.updateProfile(updatedUserInfo).pipe(first()).subscribe((user) => {
        if (user) {
          this.user = user;
          this.userService.user = user;
          // alert('profile updated');
          this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);
        }
      }, (error) => {
          this.user = this.userService.getUser();
          this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);
          // alert('error updating profile');
      });
    }
  }

  /**
   * This function will pre-fill the form with user's profile information
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  cancelEditProfile() {
    this.disableButton = true;
    this.user = this.userService.getUser();
    this.fillFormGroup(this.user.firstName, this.user.lastName, this.user.email, this.user.username, this.user.password);
  }

  /**
   * This function pre-fills the form, which contains the neccessary input validations
   * @param firstName : input firstname to fill out the form
   * @param lastName : input lastnme to fill out the form
   * @param email : input email to fill out the form
   * @param username : input username to fill out the form
   * @param password : input password to fill out the form
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  fillFormGroup(firstName: string, lastName: string, email: string, username: string, password: string) {
    this.form = this.fb.group({
      firstName: [firstName.trim(), [Validators.required, Validators.minLength]],
      lastName: [lastName.trim(), [Validators.required, Validators.minLength]],
      email: [email.trim(), [Validators.required, Validators.email]],
      username: [username.trim(), [Validators.required, Validators.minLength]],
      currPassword: ['', [Validators.required, Validators.minLength]],
      password: ['', [Validators.required, Validators.minLength]],
      confirmPassword: ['', [Validators.required, Validators.minLength]],
    }, {
        validator: [
          ProfileComponent.MatchPassword, // match password validation
          ProfileComponent.RevatureEmail, // must be Revature email
        ]
    });
  }

  /**
   * This function will disable button if all input validations of the form are not satisfied
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  formFilled() {
    if (this.form.valid) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  /**
   * This function will force the user's to retype the input field for confirming password
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  retypeConfirmPassword() {
    this.form.get('confirmPassword').setValue('');
  }
}

/*
TODO
- (optional) usernme must be uniqued (call to the db) --> mat-error when username is not uniqued
- (optional) email must be uniqued (call to the db) --> mat-error when email is not uniqued
*/
