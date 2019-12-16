import { TimeAgoPipe } from "time-ago-pipe";
import "hammerjs";

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SidenavComponent } from "./components/HUD/sidenav/sidenav.component";
import { MaterialModule } from "./misc-modules/material/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./components/pages/login-register-auth/login/login.component";
import { NavMenuComponent } from "./components/HUD/nav-menu/nav-menu.component";
import { LoginRegisterPageComponent } from "./components/pages/login-register-auth/login-register-page/login-register-page.component";
import { ProjectDescriptionComponent } from "./components/pages/project/project-description/project-description.component";
import { ProjectListComponent } from "./components/pages/project/project-list/project-list.component";
import { ProjectViewComponent } from "./components/pages/project-view/project-view.component";
import { NgxHmCarouselModule } from "ngx-hm-carousel";
import { NgxCarouselComponent } from "./components/pages/project/ngx-carousel/ngx-carousel.component";
import { ProjectInfoComponent } from "./components/pages/project/project-info/project-info.component";
import { ProjectEditComponent } from "./components/pages/project-edit/project-edit.component";
import { PageNotFoundComponent } from "./components/pages/page-not-found/page-not-found.component";
import { RegisterComponent } from "./components/pages/login-register-auth/register/register.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgMetaModule } from "ngmeta";
import { HighlightModule } from "ngx-highlightjs";
import { ProjectSubmissionPageComponent } from "./components/pages/project-submission/project-submission-page/project-submission-page.component";
import { EditDialogComponent } from "./components/pages/project-submission/edit-dialog/edit-dialog.component";
import { TokenInterceptor } from "./services/jwtInterceptor.interceptor";
import { ProfileComponent } from "./components/pages/user-management/profile/profile.component";
import { AllUsersPageComponent } from "./components/pages/user-management/all-users-page/all-users-page.component";
import { EllipsisPipe } from "../pipes/ellipsis.pipe";
import { CodebaseComponent } from "./components/pages/codebase/codebase.component";
import { AdminChangeRolesComponent } from "./components/pages/user-management/admin-change-roles/admin-change-roles.component";
import { ProjectsPendingApprovalPageComponent } from "./components/pages/project-approval/projects-pending-approval-page/projects-pending-approval-page.component";
import { PendingProjectsTableComponent } from "./components/pages/project-approval/pending-projects-table/pending-projects-table.component";
import { SelectedProjectViewerComponent } from "./components/pages/project-approval/selected-project-viewer/selected-project-viewer.component";
import { PendingEditRequestsTableComponent } from "./components/pages/project-approval/pending-edit-requests-table/pending-edit-requests-table.component";
import { LexPipe } from "./zip-file-explorer/lex.pipe";
import { LineNumberPipe } from "./zip-file-explorer/line-number.pipe";

import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import html from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import { HomePageComponent } from "./components/pages/home-page/home-page.component";
import { AboutComponent } from "./components/pages/about/about.component";
import { NotificationsComponent } from "./components/pages/notifications/notifications.component";

export function hljsLanguages() {
  return [
    { name: "typescript", func: typescript },
    { name: "javascript", func: javascript },
    { name: "scss", func: scss },
    { name: "xml", func: xml },
    { name: "html", func: html },
    { name: "css", func: css },
    { name: "java", func: java },
    { name: "python", func: python }
  ];
}

@NgModule({
  declarations: [
    AdminChangeRolesComponent,
    AllUsersPageComponent,
    AppComponent,
    CodebaseComponent,
    EditDialogComponent,
    EllipsisPipe,
    LexPipe,
    LineNumberPipe,
    LoginComponent,
    LoginRegisterPageComponent,
    NavMenuComponent,
    NgxCarouselComponent,
    PageNotFoundComponent,
    ProfileComponent,
    PendingEditRequestsTableComponent,
    PendingProjectsTableComponent,
    ProjectDescriptionComponent,
    ProjectEditComponent,
    ProjectInfoComponent,
    ProjectListComponent,
    ProjectsPendingApprovalPageComponent,
    ProjectSubmissionPageComponent,
    RegisterComponent,
    SelectedProjectViewerComponent,
    SidenavComponent,
    ProjectViewComponent,
    HomePageComponent,
    AboutComponent,
    NotificationsComponent,
    TimeAgoPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgxHmCarouselModule,
    NgMetaModule,
    ReactiveFormsModule,
    HighlightModule.forRoot({ languages: hljsLanguages })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [EditDialogComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
