import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidenavComponent} from './components/HUD/sidenav/sidenav.component';
import {MaterialModule} from './misc-modules/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './components/HUD/navbar/navbar.component';
import {LoginComponent} from './components/pages/login-register-auth/login/login.component';
import {NavMenuComponent} from './components/HUD/nav-menu/nav-menu.component';
import {RegisterComponent} from './components/pages/login-register-auth/register/register.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import {ProjectDescriptionComponent} from './components/pages/project/project-description/project-description.component';
import {ProjectListComponent} from './components/pages/project/project-list/project-list.component';
import {ProjectGridPageComponent} from './components/pages/project/project-grid-page/project-grid-page.component';
import {NgxHmCarouselModule} from 'ngx-hm-carousel';
import {NgxCarouselComponent} from './components/pages/project/ngx-carousel/ngx-carousel.component';
import {ProjectInfoComponent} from './components/pages/project/project-info/project-info.component';
import {EditProjectComponent} from './components/pages/project/edit-project/edit-project.component';
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgMetaModule } from 'ngmeta';
import { MatInputModule, MatSnackBarModule } from '@angular/material';
import { ProjectSubmissionPageComponent } from './components/pages/project-submission/project-submission-page/project-submission-page.component';
import { EditDialogComponent } from './components/pages/project-submission/edit-dialog/edit-dialog.component';
import {MatDialogModule} from '@angular/material';
import { TokenInterceptor } from './services/jwtInterceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    LoginComponent,
    NavMenuComponent,
    RegisterComponent,
    LoginRegisterPageComponent,
    ProjectDescriptionComponent,
    ProjectListComponent,
    ProjectGridPageComponent,
    NgxCarouselComponent,
    ProjectInfoComponent,
    EditProjectComponent,
    PageNotFoundComponent,
    ProjectSubmissionPageComponent,
    EditDialogComponent
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
