import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectSubmissionComponent } from './project-submission/project-submission.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { ProjectService } from '../core/services/project.service';
import { SharedModule } from '../shared/shared.module';
import { ZipFileExplorerModule } from '../zip-file-explorer/zip-file-explorer.module';
import { InputDialogComponent } from './project-submission/input-dialog/input-dialog.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditDialogComponent } from './project-submission/edit-dialog/edit-dialog.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewProjectsLogicComponent } from './view-projects-logic/view-projects-logic.component';
import { ViewUsersProjectsComponent } from './view-users-projects/view-users-projects.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ProjectSubmissionComponent,
    ViewProjectsComponent,
    InputDialogComponent,
    EditProjectComponent,
    EditDialogComponent,
    ViewUsersComponent,
    ViewProjectsLogicComponent,
    ViewUsersProjectsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule,
    ZipFileExplorerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  entryComponents: [InputDialogComponent, EditDialogComponent],
  providers: [ProjectService]
})
export class ProjectModule { }
