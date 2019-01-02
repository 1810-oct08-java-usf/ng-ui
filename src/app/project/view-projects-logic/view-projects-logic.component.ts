import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Project } from 'src/app/core/models/Project';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-view-projects-logic',
  templateUrl: './view-projects-logic.component.html',
  styleUrls: ['./view-projects-logic.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewProjectsLogicComponent implements OnInit, OnDestroy {
  trainerCanEdit = false;
  currentUser: User;
  displayedColumns: string[] = ['name', 'batch', 'trainer', 'techStack', 'status'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedProject: Project | null;

  imagePage = 0;

  allProjects: Project[];
  userProjects: Project[];
  subscription: Subscription;
  constructor(private router: Router, private viewProjectsService: ProjectService, private userService: UserService) { }

  /**
   * Only push approved project into the allProject datastructure
   * if the user's role is ROLE_User
   * @ Louis Pipkin (1810-Oct22-Java-USF)
   */
  ngOnInit() {
    if (this.userService.getUser() === null) {
      this.router.navigate(['/auth/login']);
    } else {
      this.currentUser = this.userService.getUser();
      const trainerFullName = this.currentUser.firstName.trim() + ' ' + this.currentUser.lastName.trim();
      this.subscription = this.viewProjectsService.getAllProjects()
      .subscribe((projectResponse) => {
        let u = JSON.parse(localStorage.user);

        for(let i = 0; i < projectResponse.length; i++) {
         projectResponse[i].approvingProject = false;
         projectResponse[i].projectApproved = false;
        }



        if (u.role === "ROLE_USER") {
          let approvedDataSource = [];
          for(let i = 0; i < projectResponse.length; i++) {
            if(projectResponse[i].status === 'Approved') {
              approvedDataSource.push(projectResponse[i]);
            }
          }
          // this.dataSource = new MatTableDataSource(approvedDataSource);
          this.allProjects = approvedDataSource;
        } else {
          this.allProjects = projectResponse;
        }
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.allProjects);
        /* place all the current user's project's in an array to easily switch between tabs to see all projects and
        a particular user's projects without having to make multiple calls to the server */
        this.userProjects = [];
        for (let i = 0; i < projectResponse.length; i++) {
          if (projectResponse[i].trainer === trainerFullName) {
            this.userProjects.push(projectResponse[i]);
          }
        }
        this.dataSource = new MatTableDataSource(this.allProjects);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

    /**
   * This method determines if a trainer can edit a project; a trainer can only edit a project if the project was submitted by the trainer.
   * @param project: the project who's trainer is being validated
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  canEdit(project: any) {
    const trainerFullName = this.currentUser.firstName.trim() + ' ' + this.currentUser.lastName.trim();
    if (this.currentUser.role === 'ROLE_ADMIN') {
      this.trainerCanEdit = true;
    } else if (trainerFullName === project.trainer) {
      this.trainerCanEdit = true;
    } else {
      this.trainerCanEdit = false;
    }
  }

    /**
  * this is a lifecycle method called once by Angular before the component is destroyed;
  * it is usually used to close resources such as unsubscribing from the observable's data stream;
  * resources should be released to avoid memory leaks
  * @author Shawn Bickel (1810-Oct08-Java-USF)
  */
 ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}

  /**
   * This function is used to filter the table based on the inputted string.
   * It is binded as an event listener.
   * @param filterValue : a string value that is used to filter the dataSource for the MatTable
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
    /**
   * This function is used to increment the page index of the project's screenshot.
   * Incrementing the page index will render the next project's screenshot.
   * @param totalAmountOfScreenShots : a number value that contains the total number of screenshots for a particular project
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  nextImage(totalAmountOfScreenShots: number) {
    this.imagePage = (this.imagePage + 1) % totalAmountOfScreenShots;
  }

  /**
   * This function is used to decrement the page index of the project's screenshot.
   * Decrementing the page index will render the next project's screenshot.
   * @param totalAmountOfScreenShots : a number value that contains the total number of screenshots for a particular project
   * @author Yuki Mano (1810-Oct08-Java-USF)
   */
  previousImage(totalAmountOfScreenShots: number) {
    this.imagePage--;
    if (this.imagePage < 0) {
      this.imagePage = totalAmountOfScreenShots;
    }
  }
  codebase(project) {
    this.viewProjectsService.CurrentProject = project;
    this.router.navigate(['/codebase']);
  }

  edit(project) {
    this.router.navigate([project.id + '/edit']);
  }

  approve(project, event) {
    event.stopPropagation();
    project.status = 'Approved';
    project.approvingProject = true;
    this.viewProjectsService.updateProject(project, project.id).subscribe(
      result => {
        project.approvingProject = false;
        project.projectApproved = true;
        // alert('Project has been successfully approved');
      }, err => {

      }

    )
  }

  decline(project, event) {
    event.stopPropagation();
    project.status = 'Denied';
    project.approvingProject = true;
    this.viewProjectsService.updateProject(project, project.id).subscribe(
      result => {
        project.approvingProject = false;
        project.projectDeclined = true;
        // alert('Project has been successfully approved');
      }, err => {

      }
    )
  }


}
