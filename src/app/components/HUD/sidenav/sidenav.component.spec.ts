import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { BehaviorSubject, observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { SidenavComponent } from './sidenav.component';
import { MatSidenavModule, MatIconModule, MatMenuModule, MatToolbarModule, MatExpansionModule, MatListModule, MatBadgeModule } from '@angular/material';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { RouterScroller } from '@angular/router/src/router_scroller';
import { PipeModule } from '../../../../pipes/pipe.module';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MockNotificationService } from 'src/app/mocks/mock-notification-service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';

fdescribe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;
    let router;
    let routerSpy;
    let nService: NotificationsService;
    // Nested subscribes throw errors, so the patch function is faced with patchReturn.
    let patchReturn$ = new BehaviorSubject<boolean>(null);
    patchReturn$.next(true);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavComponent, NavMenuComponent],
            imports: [MatSidenavModule, MatIconModule, MatMenuModule,
                MatToolbarModule, MatExpansionModule,
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

        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        nService = TestBed.get(NotificationsService);
    });

    afterEach(() =>{
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should route to profile when requested', () => {
        component.routeToProfile();

        expect(routerSpy).toHaveBeenCalledWith(['/profile']);
    });

    it('should route to profile when avatar is clicked on', () => {
        let avatar = fixture.debugElement.query(By.css('.user-avatar'));

        avatar.nativeElement.click();

        expect(routerSpy).toHaveBeenCalledWith(['/profile']);
    });
    
    it('should route to notification page when "See all" is clicked', () => {
        let bell = fixture.debugElement.query(By.css('.bell'));
        bell.nativeElement.click();
        let seeAll = fixture.debugElement.query(By.css('.see-all-a'));
        seeAll.nativeElement.click();
        expect(routerSpy).toHaveBeenCalledWith(['/notifications']);
    })
    
    it('should call PatchNotification twice when "Mark all as read" is clicked', () => {
        let patchSpy = spyOn(nService, 'patchReadNotification').and
        .callFake(function () { return this.patchReturn$.asObservable(); });
        let bell = fixture.debugElement.query(By.css('.bell'));
        bell.nativeElement.click();
        let readAll = fixture.debugElement.query(By.css('.mark-all-a'));
        readAll.nativeElement.click();
        expect(patchSpy).toHaveBeenCalled();
    })

    it('should call PatchNotification when an envelope icon is clicked', () => {
        let patchSpy = spyOn(nService, 'patchReadNotification').and
        .callFake(function () { return this.patchReturn$.asObservable(); });
        let bell = fixture.debugElement.query(By.css('.bell'));
        bell.nativeElement.click();
        let mail = fixture.debugElement.query(By.css('.read-button'));
        mail.nativeElement.click();
        expect(patchSpy).toHaveBeenCalled();
    })



    it('loggedIn should be false if user is not logged in', () => {
        //component.loggedIn = true;

        let userService = TestBed.get(UserService);

        userService.user.next(null);

        component.ngOnInit();

        expect(component.loggedIn).toEqual(false);
    })


    it('should write to console.log when log is called', () => {
        let consoleSpy = spyOn(console, 'log').and
            .callFake(function () { return null; });

        component.log('words');

        expect(consoleSpy).toHaveBeenCalledWith('words');
    });

    it('should request notifications upon creation', () => {
        expect(component.notifications.length).toEqual(3);
    })

    it('should display dropdown menu when bell is clicked', () => {
        let bell = fixture.debugElement.query(By.css('.bell'));
        bell.nativeElement.click();
        let seeAll = fixture.debugElement.query(By.css('.see-all-a'));
        expect(seeAll).toBeTruthy();
    })

    fit('should route to a project when requested', () => {
        nService.getAllNotifications(20).subscribe((nList)=> {
            component.routeToProject(nList[0]);
            expect(routerSpy).toHaveBeenCalledWith(['/project-view']);
        });
    })


});
