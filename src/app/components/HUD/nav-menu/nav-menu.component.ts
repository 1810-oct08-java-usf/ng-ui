import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { nonUserMenu, userMenu, adminMenu } from 'src/app/utils/menus';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

    @Output() readonly menuOptionClicked = new EventEmitter<void>();

    loggedIn = false;
    panelOpenState = false;
    user: User;
    admin = false;
    menu: any = [];

    constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {
    }

    /**
    * On component instantiation:
    * Subscribes to the user service to keep track of the user who is logged in.
    * The user is used to keep track of the nav-menu display rather than the jwt because
    * the nav-menu needs to be aware of session changes at every page and an observable is the most
    * reliable way to constantly check for these changes. You cannot subscribe to an item in local storage.
    * 
    */
    ngOnInit() {
        this.userService.user.asObservable().subscribe(
            user => {
                this.user = user;
                if (this.user && this.user.role === 'ROLE_ADMIN') this.menu = adminMenu;
                else if (this.user) this.menu = userMenu;
                else this.menu = nonUserMenu;
            }
        );
    }

    /**
     * Function that:
     * Navigates to component related to the provided route.
     */
    goToRoute(route: string) {
        this.menuOptionClicked.emit();
        if (route == "logout") {
            this.userService.logout();
            this.router.navigate(['']);
        }
        else this.router.navigate([route]);
    }

}
