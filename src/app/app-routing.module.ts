import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import {ProjectGridPageComponent} from './components/pages/project/project-grid-page/project-grid-page.component';
import { ProjectSubmissionPageComponent } from './components/pages/project-submission/project-submission-page/project-submission-page.component';
import { ProjectEditComponent } from './components/pages/project-edit/project-edit.component';
import { ProfileComponent } from './components/pages/user-management/profile/profile.component';
import { UserProjectsComponent } from './components/pages/user-projects/user-projects.component';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'auth/login', component: LoginRegisterPageComponent},
  {path: 'projects', component: ProjectGridPageComponent},
  {path: 'user/projects', component: UserProjectsComponent},
  {path: 'submitform', component: ProjectSubmissionPageComponent},
  {path: 'updateform', component: ProjectEditComponent},
  {path: 'profile', component: ProfileComponent},

  // Do not put any routes below this one!
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
