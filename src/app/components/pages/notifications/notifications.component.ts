import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { User } from 'src/app/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Notification } from 'src/app/models/Notification';
import { ProjectFilterService } from 'src/app/services/project-filter.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})

export class NotificationsComponent implements OnInit, OnDestroy {
    title: string = "My Notifications";
    currentUser: User;
    userId: string;
    notificationList: Notification[] = [];
    pageNumber = 0;

    constructor(
        private router: Router,
        private userService: UserService,
        private notificationService: NotificationsService,
        private filterService: ProjectFilterService,
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        // Create an event listener for scrolling
        window.addEventListener('scroll', this.scroll, true);
        this.userService.user.asObservable().subscribe(
            user => {
                if (user) {
                    this.currentUser = user;
                }
            }
        );

        // If the current page is 'notifications' get the userId
        if (this.router.url.includes('notification')) {
            this.userId = this.currentUser.id + "";
        }
        // Request the first page of notifications, this.pageNumber = 0 at this point
        this.notificationService.getNotificationPage(this.currentUser, this.pageNumber).subscribe(page => {
            page.content.forEach(n => {
                this.notificationList.push(n)
            });
        });
    }
    // Close event listener
    ngOnDestroy() {
        window.removeEventListener('scroll', this.scroll, true);
    }
    /**
     * Navigate to the project corresponding to the notification
     * @param n the notification 
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
    // TODO verify endpoint regarding marking a "read" notification as "unread", update noticeCount when moved to Service
    /**
     * Toggle the Read status of the notification in the database
     * @param n the notification the user clicked
     */
    toggleRead(n: Notification) {
        this.notificationService.patchReadNotification(n).subscribe(x => {});
        event.stopPropagation();
    }

    /**
     * Load the next page of notifications for the current user
     */
    getNextPage() {
        this.pageNumber++
        this.notificationService.getNotificationPage(this.currentUser, this.pageNumber).subscribe(page => {
            page.content.forEach(n => {
                this.notificationList.push(n)
            });
        });
    }
    /**
     * Window event listener set to scroll, determine if the "load-more" div is moves on screen and runs getNextPage()
     */
    scroll = (event): void => {
        let h = document.getElementById("load-more");
        let rect = h.getBoundingClientRect();
        let elemTop = rect.top;
        let elemBottom = rect.bottom;
        if ((elemTop >= 0) && (elemBottom <= window.innerHeight)) {
            this.getNextPage();
        }
    }
}


