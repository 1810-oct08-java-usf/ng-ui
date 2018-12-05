import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { ZipComponentComponent } from '../zip-file-explorer/zip-component/zip-component.component'

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'project_submission', component: ProjectSubmissionComponent },
  // TODO { path: ':id', component: ViewProjectComponent },
  // TODO { path: ':id/edit', component: EditProjectComponent },
  { path: ':id/codebase', component: ZipComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
