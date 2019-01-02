import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { ZipComponent } from '../zip-file-explorer/zip/zip.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { LoginComponent } from '../authentication/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },//added by Ryan to fix console.log errors on initial page load
  { path: 'home', component: HomePageComponent },
  { path: 'project_submission', component: ProjectSubmissionComponent },
  { path: ':id/edit', component: EditProjectComponent },
  { path: 'codebase', component: ZipComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
