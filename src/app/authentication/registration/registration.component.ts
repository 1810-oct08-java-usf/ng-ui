import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgMetaService } from 'ngmeta';
import { first } from 'rxjs/operators';

import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

/**
 * This component was built to allow registration and validation for registering users.
 * The validation that is performed is to ensure there are no characters in the username,
 * no underscores at the beginning or end of the username, the email is an @revature.com email,
 * names are at least 2 characters long, and passwords are validated by typing twice and ensuring
 * they match. Usernames and passwords must be at least 8 characters long. No next buttons
 * can be hit unless the forms are valid.
 * @author Ryan Beevers (1810-Oct08-Java-USF)
 */
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  user: User = {};
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  loginUser: User = {};
  registering = false;
  authenticating = false;

  // email pattern ensures the email is a @revature.com email
  emailPattern = '^[a-zA-Z0-9_.+-]+(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?@(revature)\.com$';

  // username pattern ensures there are no underscores at beginning or end of username
  // and at least 8 characters
  usernamePattern = '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$';
  confirmPassword: string;

  checkingIfEmailIsInUse = false;
  emailIsAvailable = false;
  emailIsNotAvailable = false;
  emailToCheck: string;



  checkingIfUsernameIsAvailable = false;
  usernameIsAvailable = false;
  usernameIsNotAvailable = false;
  usernameToCheck: string;

  // this method is called to ensure password was typed correctly
  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }

  constructor(private userService: UserService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private ngmeta: NgMetaService) { }

  ngOnInit() {
    if (this.userService.getUser() !== null) {
      this.router.navigate(['']);
    } else {
      this.ngmeta.setHead({ title: 'Register | RPM' });
    }

    // all the different validators to ensure form is properly filled
    this.firstFormGroup = this._formBuilder.group({
      firstName: [
        Validators.required,
        Validators.minLength
      ],
      lastName: [
        Validators.required,
        Validators.minLength
      ],
      email: [
        Validators.required,
        Validators.minLength
      ]
    });
    this.secondFormGroup = this._formBuilder.group({
      username: [
        Validators.required,
        Validators.minLength
      ],
      password: [
        Validators.required,
        Validators.minLength
      ],
      confirmPassword: [
        Validators.required,
        Validators.minLength
      ]
    }, {
      validator: RegistrationComponent.MatchPassword // match password validation
    });
  }

  // registration method takes the validated fields packages into a JSON and sends the observable
  register() {
    console.log(this.user);
    this.registering=true;
    this.userService.register(this.user).pipe(first()).subscribe((user) => {
      if (user) {
        this.registering=false;
        this.authenticating = true;
        this.loginUser.username = user.username;
        this.loginUser.password = user.password;
        this.userService.login(this.loginUser).pipe(first()).subscribe(
          (user) => {
          this.authenticating = false;
          this.router.navigate(['/home']);
          });



        //this.router.navigate(['/auth/login']);
      }
    });
  }

  /*Function to be called as user types on email input form
  Checks first to see if there is a value for the email, then
  makes the request over the "internodes" to see if the email
  is available given that '@revature.com' is within the email
  */
  checkIfEmailIsInUseKey() {
    var ref = this.user.email;
    setTimeout(() => {
      if(ref){
        if(ref.endsWith("@revature.com")) {
          this.emailToCheck = this.user.email;
          this.emailIsAvailable = false;
          this.emailIsNotAvailable = false;
          this.checkingIfEmailIsInUse = true;

          this.userService.checkIfEmailIsInUse(this.user.email).subscribe(
            result => {
              if(result['emailIsInUse'] == false) {
                this.checkingIfEmailIsInUse = false;
                this.emailIsAvailable = true;
              } else {
                this.checkingIfEmailIsInUse = false;
                this.emailIsNotAvailable = true;
              }

            }, err => {
              this.checkingIfEmailIsInUse = false;
              this.emailIsAvailable = true;


            }
          )

        }
    }
  }, 1000)
  }

  /*Function to be called when focus is deselected on email input form
  */
  checkIfEmailIsInUse() {
    if(this.user.email.endsWith("@revature.com")) {
      this.emailToCheck = this.user.email;
      this.emailIsAvailable = false;
      this.emailIsNotAvailable = false;
      this.checkingIfEmailIsInUse = true;

      this.userService.checkIfEmailIsInUse(this.user.email).subscribe(
        result => {
          if(result['emailIsInUse'] == false) {
            this.checkingIfEmailIsInUse = false;
            this.emailIsAvailable = true;
          } else {
            this.checkingIfEmailIsInUse = false;
            this.emailIsNotAvailable = true;
          }
          
        }, err => {
          this.checkingIfEmailIsInUse = false;
          this.emailIsAvailable = true;


        }
      )

    }
  }

  /*Function to be called as user types on username input form
    Checks to see if username for registration is available
  */
  checkIfUsernameIsAvailableKey() {
    var ref = this.user.username;
    setTimeout(() => {
      if(ref.length >= 8) {
        this.usernameToCheck = this.user.username;
        this.usernameIsAvailable = false;
        this.usernameIsNotAvailable = false;
        this.checkingIfUsernameIsAvailable = true;
  
        this.userService.checkIfUsernameIsAvailable(this.usernameToCheck).subscribe(
          result => {
            if(result['usernameIsAvailable'] ==  true) {
              this.checkingIfUsernameIsAvailable = false;
              this.usernameIsAvailable = true;
            } else {
              this.checkingIfUsernameIsAvailable = false;
              this.usernameIsNotAvailable = true;
            }
  
  
          }, err => {
            this.checkingIfUsernameIsAvailable = false;
            this.usernameIsNotAvailable = true;
          }
        )
      }
    }, 1000)
  }

  /*Function to be called when focus is deselected from username input form
    Checks to see if username for registration is available
  */
  checkIfUsernameIsAvailable() {
    if(this.user.username.length >= 8) {
      this.usernameToCheck = this.user.username;
      this.usernameIsAvailable = false;
      this.usernameIsNotAvailable = false;
      this.checkingIfUsernameIsAvailable = true;

      this.userService.checkIfUsernameIsAvailable(this.usernameToCheck).subscribe(
        result => {
          if(result['usernameIsAvailable'] ==  true) {
            this.checkingIfUsernameIsAvailable = false;
            this.usernameIsAvailable = true;
          } else {
            this.checkingIfUsernameIsAvailable = false;
            this.usernameIsNotAvailable = true;
          }


        }, err => {
          this.checkingIfUsernameIsAvailable = false;
          this.usernameIsNotAvailable = true;
        }
      )



    }
  }



}
