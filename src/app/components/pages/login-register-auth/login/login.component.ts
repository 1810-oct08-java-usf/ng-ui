import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { NgMetaService } from 'ngmeta/dist/ngmeta.service';



/**
 * Login component takes in a username and password and checks to see if user exists. If
 * user exists, user is successfully logged in. Validation includes not letting user hit
 * login until form is entirely filled out
 * @author Ryan Beevers (1810-Oct08-Java-USF)
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = { };

  usernameO = false;
  passwordO = false;
  authenticating = false;
  loggedIn = false;

  logSuccess = true;

  constructor(private userService: UserService, private router: Router, private ngmeta: NgMetaService) { }

  ngOnInit() {
    //added '\home' to navigate so that if a user is already logged in, landing page routes to home page
    if (this.userService.getUser() !== null) {
      this.router.navigate(['\home']);
    } else {
      this.ngmeta.setHead({ title: 'Login | RPM' });
    }
  }

  login() {
    this.authenticating = true;
    this.userService.login(this.user).pipe(first()).subscribe((user) => {
      if (user) {
        this.authenticating = false;
        this.loggedIn = true;
        this.router.navigate(['/home']);
      } else {
        this.authenticating = false;

        this.logSuccess = false;
       
      }
    }, (error) => { 
      this.authenticating = false;
      this.logSuccess = false;
     
    });

  }

  /* Logs in user upon enter
  */
  loginE() {
    if(!this.user.username || this.user.username.length == 0) {
      this.usernameO = true;
      return;
    } else {
      this.usernameO = false;
    }
    if(!this.user.password || this.user.username.length == 0) {
      this.passwordO = true;
      return;
    } else {
      this.passwordO = false;
    }

    if(this.user.username.length != 0 && this.user.password.length != 0) {
      this.authenticating = true;
      this.userService.login(this.user).pipe(first()).subscribe((user) => {
        if (user) {
          this.authenticating = false;
          this.loggedIn = true;
          this.router.navigate(['/home']);
        } else {
          this.authenticating = false;
          alert('Error logging in');
        }
       }, (error) => { this.authenticating = false; alert('ERROR LOGGING IN'); });
    }

  }

  /* Listens to key input on password input field to remove 'Password is required'
  */
  checkEP(event) {
    if(JSON.parse(event['cancelable']) == false) {

    }
    else if(event.key.length == 1) {
    this.passwordO = false;
    }
  }

  /* Listens to key input on username input field to remove 'Username is required'
  */
  checkE(event) {
    if(JSON.parse(event['cancelable']) == false) {

    }
    else if(event.key.length == 1) {
    this.usernameO = false;
    }
  }
}