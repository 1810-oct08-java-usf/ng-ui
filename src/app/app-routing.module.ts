import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import {ProjectGridPageComponent} from './components/pages/project/project-grid-page/project-grid-page.component';
import { ProjectSubmissionPageComponent } from './components/pages/project-submission/project-submission-page/project-submission-page.component';
import { ProjectEditComponent } from './components/pages/project-edit/project-edit.component';
import { ProfileComponent } from './components/pages/user-management/profile/profile.component';
import { ZipComponent } from './zip-file-explorer/zip/zip.component';
import { CodebasePageComponent } from './components/pages/codebase-page/codebase-page.component';
import { AdminChangeRolesComponent } from './components/pages/user-management/admin-change-roles/admin-change-roles.component';
import { ProjectsPendingApprovalPageComponent } from './components/pages/project-approval/projects-pending-approval-page/projects-pending-approval-page.component';
import { CodebaseComponent } from './components/pages/codebase/codebase.component';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'auth/login', component: LoginRegisterPageComponent},
  {path: 'projects', component: ProjectGridPageComponent},
  {path: 'projects/1', component: ProjectGridPageComponent},
  {path: 'submitform', component: ProjectSubmissionPageComponent},
  {path: 'updateform', component: ProjectEditComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'codebase', component: CodebaseComponent},
  {path: 'adminchangeroles', component: AdminChangeRolesComponent},
  {path: 'projects/pending', component: ProjectsPendingApprovalPageComponent},

  // Do not put any routes below this one!
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
