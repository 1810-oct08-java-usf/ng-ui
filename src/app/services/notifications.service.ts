import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Notification } from '../models/Notification';
import {environment} from '../../environments/environment';
import { Page } from '../models/Page';
import { Patch } from '../models/Patch';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    notification: BehaviorSubject<Notification>;
    patchItem:Patch= {notification_id:0, user_id:0}

    constructor(private http: HttpClient) { }

    // TODO clean this up: copied from user.service
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('Aw, Snap!\n' + error.error.message);
        } else {
            console.error(
                `Error code ${error.status}:
        ${error.error}`
            );
        }

        return throwError('Something went wrong; please try again later.');
    }

    /**
     * Request all notifications for the current user. 
     * This will return any unread notifications and enough read notifications 
     * to make the total number five, as long as there are that many read notifications. 
     * Returns array of notifications
     * @param userID
     */ 
    getAllNotifications(userID: any): Observable<Notification[]> {
        return this.http.get<Notification[]>(`http://localhost:13377`, httpOptions /*environment.url +'/notifications/', httpOptions*/)
            .pipe(catchError(this.handleError));
    }

    /** Request a page of notifications, regardless of read statusReturns array of notifications
     * @param userID the id of the logged in user
     * @param n the page number requested
    */
    getNotificationPage(userID: any, n: number):Observable<Page> {
        return this.http.get<Page>(`http://localhost:13377/history?page=${n}`, httpOptions /*environment.url + '/notifications/history?page=${n}', httpOptions*/)
            .pipe(catchError(this.handleError));
    }

    /** Request an update of a notification, marking the status "read" if it was unread, and "unread" if read
     * @param notification the notification to be updated
    */
    patchReadNotification(notification:Notification){
        this.patchItem.notification_id=notification.notificationId;
        this.patchItem.user_id=notification.userId;
        return this.http.patch(`http://localhost:13377`, this.patchItem, httpOptions /*environment.url +'/notifications/', notification, httpOptions*/)
        .pipe(catchError(this.handleError));
    }

}
