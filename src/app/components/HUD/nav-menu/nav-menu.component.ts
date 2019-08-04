import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {Router} from '@angular/router';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/User';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  loggedIn = false;
  panelOpenState = false;
  user: User;

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {
  }

   /**
   * On component instantiation:
   * Subscribes to the user service to keep track of the user who is logged in.
   * The user is used to keep track of the nav-menu display rather than the jwt because
   * the nav-menu needs to be aware of session changes at every page and an observable is the most
   * reliable way to constantly check for these changes. You cannot subscribe to an item in local storage.
   * @author Justin Kerr (190422-USF)
   */
  ngOnInit() {

    this.userService.user.asObservable().subscribe(
      user => {
        this.user = user;
        if (this.user) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

   /**
   * Function that:
   * Calls the user service logout function and re-routes to the login page.
   */
  logout() {
    this.userService.logout();
    this.router.navigate(['auth/login']);
  }

  /**
   * Function that:
   * Sets the type of project view to local storage (type can be set to 'view' or 'all').
   * Both types are routed to the project-grid-page component, but a /1 is denoted for user projects.
   * The 1 was a test variable but can be changed to more appropriately represent the user Id.
   */
  getProjects(type) {
        localStorage.removeItem('viewprojects');
        localStorage.setItem('viewprojects', type);
        if (type == 'user') this.router.navigate(['projects/1']);
        else this.router.navigate(['projects'])
  }

  /**
   * Function that:
   * Navigates to the project-submission-page component.
   */
  goToSubmit() {
    this.router.navigate(['submitform']);
  }

  /**
   * Function that:
   * Navigates to the project-edit-submissions component
   */

    goToEditRequest() {
      this.router.navigate(['editrequest']);
    }

  /**
   * Function that:
   * Navigates to the profile component.
   */
  goToProfile() {
    this.router.navigate(['profile']);
  }

  goToEditUsers() {
    this.router.navigate(['changeroles']);
  /**
   * Function that:
   * Navigates to the LoginRegisterComponent.
   */
  }
  goToLoginRegister() {
    this.router.navigate(['auth/login']);
  }
}
