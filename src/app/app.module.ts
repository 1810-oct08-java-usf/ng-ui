import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidenavComponent} from './components/HUD/sidenav/sidenav.component';
import {MaterialModule} from './misc-modules/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/pages/login-register-auth/login/login.component';
import {NavMenuComponent} from './components/HUD/nav-menu/nav-menu.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import {ProjectDescriptionComponent} from './components/pages/project/project-description/project-description.component';
import {ProjectListComponent} from './components/pages/project/project-list/project-list.component';
import {ProjectGridPageComponent} from './components/pages/project/project-grid-page/project-grid-page.component';
import {NgxHmCarouselModule} from 'ngx-hm-carousel';
import {NgxCarouselComponent} from './components/pages/project/ngx-carousel/ngx-carousel.component';
import {ProjectInfoComponent} from './components/pages/project/project-info/project-info.component';
import {ProjectEditComponent} from './components/pages/project-edit/project-edit.component';
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/pages/login-register-auth/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgMetaModule} from 'ngmeta';
import {MatDialogModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {ProjectSubmissionPageComponent} from './components/pages/project-submission/project-submission-page/project-submission-page.component';
import {EditDialogComponent} from './components/pages/project-submission/edit-dialog/edit-dialog.component';
import {TokenInterceptor} from './services/jwtInterceptor.interceptor';
import { ProfileComponent } from './components/pages/user-management/profile/profile.component';
import { CodebasePageComponent } from './components/pages/codebase-page/codebase-page.component';
import { AllUsersPageComponent } from './components/pages/user-management/all-users-page/all-users-page.component';
import { EllipsisPipe } from './ellipsis.pipe';
import { ChangeRolesComponent } from './components/pages/user-management/change-roles/change-roles.component';
import { EditRequestsComponent } from './components/pages/project/edit-requests/edit-requests.component';
import { ProjectApprovalComponent } from './components/pages/project-submission/project-approval/project-approval.component';

import { ProjectWelcomePageComponent } from './components/pages/project/project-welcome-page/project-welcome-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    NavMenuComponent,
    LoginRegisterPageComponent,
    ProjectDescriptionComponent,
    ProjectListComponent,
    ProjectGridPageComponent,
    NgxCarouselComponent,
    ProjectInfoComponent,
    ProjectEditComponent,
    PageNotFoundComponent,
    ProjectSubmissionPageComponent,
    EditDialogComponent,
    RegisterComponent,
    ProfileComponent,
    CodebasePageComponent,
    AllUsersPageComponent,
    EllipsisPipe,
    ChangeRolesComponent,
    EditRequestsComponent,
    ProjectApprovalComponent,
    ProjectWelcomePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    NgxHmCarouselModule,
    HttpClientModule,
    MatDialogModule,
    NgMetaModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor ,
      multi: true
    }
  ],
  entryComponents: [EditDialogComponent],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
