import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSidenavModule, MatIconModule,
  MatMenuModule, MatToolbarModule, MatExpansionModule, MatListModule, MatTableDataSource, MatBadgeModule }
  from '@angular/material';

import { SidenavComponent } from 'src/app/components/HUD/sidenav/sidenav.component';
import { NavMenuComponent } from 'src/app/components/HUD/nav-menu/nav-menu.component';
import { AllUsersPageComponent } from './all-users-page.component';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { Router } from '@angular/router';
import {User} from 'src/app/models/User';
import {of, BehaviorSubject, Observable, throwError} from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipeModule } from 'src/pipes/pipe.module';



describe('AllUsersPageComponent', () => {
  let component: AllUsersPageComponent;
  let fixture: ComponentFixture<AllUsersPageComponent>;
  let router: Router;
  let routerSpy;
  let userService;
  let projectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUsersPageComponent, SidenavComponent, NavMenuComponent ],
      imports: [ MatSnackBarModule, MatSidenavModule, MatIconModule,
        MatMenuModule, MatToolbarModule, 
        MatExpansionModule, RouterTestingModule, MatListModule, MatBadgeModule,
        HttpClientTestingModule, BrowserAnimationsModule, PipeModule ],
        providers: [{ provide: UserService, useClass: MockUserService },
          { provide: ProjectService, useClass: MockProjectService }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate').and
    .callFake( function() { return null; });

    userService = TestBed.get(UserService);
    projectService = TestBed.get(ProjectService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be instatiated with a users page and display columns', () => {
    
    expect(component.usersPage).toEqual(true);
    expect(component.displayedUserColumns).toEqual(['username', 'firstName', 'lastName', 'email', 'role']);
  });

  it('should set properties if logged in as ROLE_ADMIN', () => {
    userService.user.value.role = 'ROLE_ADMIN';

    component.ngOnInit();
    
    expect(component.retrievingProjects).toEqual(false);
  });

  //not sure how to test the applyUserFilter Method. Needs work.
  it('should filter the value of to lowercase', () => {
    let userSpy = spyOn(component, 'applyUserFilter');
    component.applyUserFilter('name');

    expect(userSpy).toHaveBeenCalled();
  });

  it('should update the user to an admin', () => {

    component.updateToAdmin(userService.user.value);

    expect(userService.user.value.role).toEqual('ROLE_ADMIN');
  });

  it('should update the user to a user if an error is returned', () => {
    let userSpy = spyOn(userService, 'updateUserRoles').and.returnValue(throwError('error message'));

    component.updateToAdmin(userService.user.value);

    expect(userService.user.value.role).toEqual('ROLE_USER');

  });

});
