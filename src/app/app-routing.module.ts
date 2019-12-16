import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { ProjectViewGuard } from './guards/project-view.guard';
import { AdminGuard } from './guards/admin.guard';

// Components
import {PageNotFoundComponent} from './components/pages/page-not-found/page-not-found.component';
import {LoginRegisterPageComponent} from './components/pages/login-register-auth/login-register-page/login-register-page.component';
import { ProjectSubmissionPageComponent } from './components/pages/project-submission/project-submission-page/project-submission-page.component';
import { ProjectEditComponent } from './components/pages/project-edit/project-edit.component';
import { ProfileComponent } from './components/pages/user-management/profile/profile.component';
import { AdminChangeRolesComponent } from './components/pages/user-management/admin-change-roles/admin-change-roles.component';
import { ProjectsPendingApprovalPageComponent } from './components/pages/project-approval/projects-pending-approval-page/projects-pending-approval-page.component';
import { CodebaseComponent } from './components/pages/codebase/codebase.component';
import { ProjectViewComponent } from './components/pages/project-view/project-view.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProjectListComponent } from './components/pages/project/project-list/project-list.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginRegisterPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'notifications', component: NotificationsComponent },
  {path: 'projects', component: ProjectListComponent},
  {path: 'projects-user', component: ProjectListComponent, canActivate: [AuthGuard] },
  {path: 'projects-pending', component: ProjectsPendingApprovalPageComponent, canActivate: [AdminGuard]},
  {path: 'project-submission', component: ProjectSubmissionPageComponent, canActivate: [AuthGuard] },
  {path: 'project-update', component: ProjectEditComponent, canActivate: [AuthGuard] },
  {path: 'project-view', component: ProjectViewComponent, canActivate: [ProjectViewGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {path: 'codebase', component: CodebaseComponent},
  {path: 'adminchangeroles', component: AdminChangeRolesComponent, canActivate: [AuthGuard] },

  // Do not put any routes below this one!
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
