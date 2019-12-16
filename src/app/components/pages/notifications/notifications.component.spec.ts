import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule, MatListModule, MatBadgeModule, MatFormFieldModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { By } from '@angular/platform-browser';

import { NotificationsComponent } from './notifications.component';
import { PipeModule } from 'src/pipes/pipe.module';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MockNotificationService } from 'src/app/mocks/mock-notification-service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { BehaviorSubject } from 'rxjs';

describe('NotificationsComponent', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;
    let router;
    let routerSpy;
    let nService: NotificationsService;
    // Nested subscribes throw errors, so the patch function is faced with patchReturn.
    let patchReturn$ = new BehaviorSubject<boolean>(null);
    patchReturn$.next(true);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationsComponent],
            imports: [MatSidenavModule, MatIconModule, MatMenuModule,
                MatToolbarModule, MatExpansionModule, MatFormFieldModule,
                HttpClientTestingModule, NoopAnimationsModule, MatListModule, MatBadgeModule,
                RouterTestingModule, PipeModule],
            providers: [{ provide: UserService, useClass: MockUserService }, 
                {provide: ProjectService, useClass: MockProjectService}, 
                {provide: NotificationsService, useClass: MockNotificationService}],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.get(Router);
        routerSpy = spyOn(router, 'navigate');

        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        nService = TestBed.get(NotificationsService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should request notification page upon creation', () => {
        expect(component.notificationList.length).toEqual(3);
    })

    it('should call PatchNotification when an envelope icon is clicked', () => {
        let patchSpy = spyOn(nService, 'patchReadNotification').and
            .callFake(function () { return this.patchReturn$.asObservable(); });
        let mail = fixture.debugElement.query(By.css('.read-button'));
        mail.nativeElement.click();
        expect(patchSpy).toHaveBeenCalled();
    })

    it('should load more pages', () => {
        component.scroll(event);
        expect(component.notificationList.length).toEqual(6);
    })

    it('should route to a project when requested', () => {
        nService.getAllNotifications(1).subscribe( nList => {
            component.routeToProject(nList[0]);
        });
        expect(routerSpy).toHaveBeenCalledWith(['/project-view']);
    })

});
