import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Project } from 'src/app/models/Project';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {

  project: Project;
  enableEditFunctionality = false;
  enableApprovalDenialBtns = false;

  // Previous Code
  trainerFullName;
  currentUser: User;
  displayedColumns: string[] = ['name', 'batch', 'trainer', 'techStack', 'status'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedProject: Project | null;
  imagePage = 0;
  userId: string;
  projectList: Project[] = [];


  constructor(private router: Router, private userService: UserService,
    private projectService: ProjectService, private snackbarService: SnackbarService) {
  }

  ngOnInit() {
    this.projectService.CurrentProject$.subscribe(
      proj => {
        if (proj) {
          this.project = proj;
          console.log(this.project.id);
          // Enabling project edition if the user owns the project
          this.currentUser = JSON.parse(localStorage.getItem('user'));
          if(this.currentUser && this.currentUser.id == this.project.userId) this.enableEditFunctionality = true;
          else this.enableEditFunctionality = false;

          // Enabling project approval and denial buttons
          if(this.currentUser && this.currentUser.role.toLowerCase() == "role_admin" && this.project.status.toLowerCase() == "pending") this.enableApprovalDenialBtns = true;
          else this.enableApprovalDenialBtns = false;
        }
      }
    );
      
  }


  /**
   * Return to last page
   */
  back() {
    window.history.back();
  }


  /**
   * This function is used to increment the page index of the project's screenshot.
   * Incrementing the page index will render the next project's screenshot.
   * @param totalAmountOfScreenShots : a number value that contains the total number of screenshots for a particular project
   * 
   */
  nextImage(totalAmountOfScreenShots: number) {
    this.imagePage = (this.imagePage + 1) % totalAmountOfScreenShots;
  }

  /**
   * This function is used to decrement the page index of the project's screenshot.
   * Decrementing the page index will render the next project's screenshot.
   * @param totalAmountOfScreenShots : a number value that contains the total number of screenshots for a particular project
   * 
   */
  previousImage(totalAmountOfScreenShots: number) {
    this.imagePage--;
    if (this.imagePage < 0) {
      this.imagePage = totalAmountOfScreenShots;
    }
  }

  /**
   * If a project is selected,
   *  updates the view to the codebase view.
   *
   */
  viewCodeBase() {
    if (this.project) {
      this.router.navigate(['/codebase']);
    }
  }

  /**
   * Let the user who owns the project, update the project
   */
  updateProject() {
    if(this.project) {
      this.router.navigate(['/project-update']);
    }
    console.log('this is called');
  }


  /**
   * Let an admin approve or deny a project
   */
  approveOrDenyProject(approve: boolean) {
    if(approve) this.project.status = "Approved";
    else this.project.status = "Denied";
    this.projectService.approveOrDenyProject(this.project).subscribe(
      (res) => {
        console.log(res);
        if(approve) this.snackbarService.openSnackBar("Project successfully approved","Success");
        if(!approve) this.snackbarService.openSnackBar("Project was denied","");
      },
      (err) => {
        this.snackbarService.openSnackBar("Some error happened. Try again later","Failed");
      }
    );
  }

}
