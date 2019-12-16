import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { Notification } from 'src/app/models/Notification';
import { ProjectService } from 'src/app/services/project.service';


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

    loggedIn = false;
    homepage = false;
    activeNotifications = false;
    count = 0;
    parseCount: any;
    userID: number;
    notifications: Notification[];

    log(state) {
        console.log(state);
    }

    constructor(
        private userService: UserService, private notificationService: NotificationsService,
        private projectService: ProjectService, private router: Router) {
        this.userService.user.asObservable().subscribe(
            user => {
                if (user) {
                    this.loggedIn = true;
                    this.userID = user.id;
                }
                else this.loggedIn = false;
            }
        );

        /**
         * Subscribe to router changes in order to know when to display content in the toolbar
         */
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                if (e.url == "/" || e.url.includes("home")) this.homepage = true;
                else this.homepage = false;
            }

        });

    }

    ngOnInit() {
        this.noticeCount();
    }

    routeToProfile() {
        this.router.navigate(['/profile']);
    }
    routeToNotifications() {
        this.router.navigate(['/notifications']);
    }
    /**
     * Navigate to the element in the screen that matches the id passed to the method
     * @param id
     */
    goToElement(id: string) {
        let elem = document.getElementById(id);
        elem.scrollIntoView({ behavior: "smooth" });
    }
    /**
     * Mark all unread notifications as read, and update the notification counter
     */
    readAll() {
        this.notifications.forEach(n => {
            if (n.read == false)
                this.notificationService.patchReadNotification(n).subscribe(x =>{});
                n.read = true;
        });
        this.activeNotifications = false;
        this.count = 0;
        this.parseCount = 0;
        this.notifications=this.notifications.slice(0,5);
    }
    /**
     * Navigate to the project corresponding to the notification
     * @param n the notification the user clicked
     */
    routeToProject(n: Notification) {
        this.projectService.getProjectByID(n.projectId).subscribe(proj => {
            if (n.read == false) {
                this.notificationService.patchReadNotification(n).subscribe(x =>{});
            }
            this.projectService.CurrentProject$.next(proj[0]);
            this.router.navigate(['/project-view']);
        });
    }

    //  TODO noticeCount should be moved to the NotificationService, so changes to the active notifications
    //  are instantly updated on the bell and drop-down menu
    /**
     * Retrieve all the notifications relating to the active user, and count the number of unread notifications
     */
    noticeCount() {
        this.notificationService.getAllNotifications(this.userID).subscribe(notices => {
            this.notifications = notices;
            this.count = 0;
            this.notifications.forEach(notification => {
                if (notification.read == false) {
                    this.activeNotifications = true;
                    this.count++;
                    if (this.count > 9)
                        this.parseCount = "9+";
                    else
                        this.parseCount = this.count;
                }
            });
        });
    }
    // TODO verify endpoint regarding marking a "read" notification as "unread"
    /**
     * Marks a read notification as unread or an unread notification as read, and updates the counter
     * @param n the notification the user clicked
     */
    toggleRead(n: Notification) {
        this.notificationService.patchReadNotification(n).subscribe(x =>{this.noticeCount()
        });
        event.stopPropagation();
    }
}
