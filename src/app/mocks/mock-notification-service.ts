import { Notification } from 'src/app/models/Notification';
import { of, BehaviorSubject, Observable } from "rxjs";

/**
* A Mock of the NotificationService
* @author - Christian Teske 191007-Full Stack
*/

export class MockNotificationService {
    
    notificationList$: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>(null);
    notificationList:Notification[];
    testNotification1:Notification;
    testNotification2:Notification;
    testNotification3:Notification;

    constructor (){
        this.testNotification1 = {
            notificationId: 1, 
            dateCreated: new Date ("2019-10-07"), 
            isRead: true, 
            title: "Test Project 1", 
            shortDescription: "This is a mock notification for a project.", 
            fullDescription: "This is a full-length description for the mock notification of a project.", 
            userId: 20, 
            contentType: "Basic Notification", // Replace with valid type when available
            projectId: "5de7cb71700b4b2de490cd6a"
        };

        this.testNotification2 = {
            notificationId: 2, 
            dateCreated: new Date ("2019-10-08"), 
            isRead: false, 
            title: "Test Project 2", 
            shortDescription: "This is also a mock notification for a project.", 
            fullDescription: "This is another full-length description for the mock notification of a project.", 
            userId: 20, 
            contentType: "Basic Notification", // Replace with valid type when available
            projectId: "5de7cb71700b4b2de490cd6c"
        };

        this.testNotification3 = {
            notificationId: 3, 
            dateCreated: new Date ("2019-10-09"), 
            isRead: false, 
            title: "Test Project 3", 
            shortDescription: "This is a third mock notification for a project.", 
            fullDescription: "This is yet another full-length description for the mock notification of a project.", 
            userId: 20, 
            contentType: "Basic Notification", // Replace with valid type when available
            projectId: "5de7cb71700b4b2de490cd6d"
        };
        this.notificationList=[this.testNotification1, this.testNotification2, this.testNotification3];
        this.notificationList$.next(this.notificationList);
    }
    
    getAllNotifications(userID: any): Observable<Notification[]> {
        return this.notificationList$.asObservable();
    }

    getNotificationPage(userID: any, n: number): Observable<Notification[]> {
        return this.notificationList$.asObservable();
    }

    patchReadNotification(notification:Notification): void {}
}