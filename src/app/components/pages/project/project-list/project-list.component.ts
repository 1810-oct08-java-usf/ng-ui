import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from 'src/app/models/User';
import {Project} from 'src/app/models/Project';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ProjectService} from 'src/app/services/project.service';
import {UserService} from 'src/app/services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectListComponent implements OnInit, OnDestroy {

  trainerFullName;
  trainerCanEdit = false;
  currentUser: User;
  displayedColumns: string[] = ['name', 'batch', 'trainer', 'techStack', 'status'];
  dataSource: MatTableDataSource<Project>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedProject: Project | null;
  imagePage = 0;
  userProjects: Project[] = [];
  subscription: Subscription;
  AllProjects$ = this.projectService.AllProjects$.asObservable();
  retrievingProjects = true;
  projectView;

  constructor(private router: Router, private userService: UserService, private projectService: ProjectService) {
  }

  ngOnInit() {

    this.userService.user.asObservable().subscribe(
      user => {
        if (user) {
        this.currentUser = user;
        this.trainerFullName = this.currentUser.firstName.trim() + ' ' + this.currentUser.lastName.trim();
        }
      }
    );

    this.subscription = this.projectService.getAllApprovedProjects()
      .subscribe(
        (projectResponse) => {
          this.retrievingProjects = false;
          this.projectService.AllProjects$.next(projectResponse);
          this.updateProjects();
        });
  }

  /**
   * This updates the currently shown projects on the left of the Project Page (src/app/components/pages/project).
   * If you provide a string of user you get that users specific project.
   * @param mySearch (String)
   * @author Ian Baker | Justin Kerr 190422-USF
   */
  updateProjects() {
    this.AllProjects$.subscribe(
      allprojects => {
        if (localStorage.getItem('viewprojects') == 'user') {
          for (let i = 0; i < allprojects.length; i++) {
            if (allprojects[i].trainer == this.trainerFullName) {
              this.userProjects.push(allprojects[i]);
            }
          }
        } else {
          this.userProjects = allprojects;
        }

        this.dataSource = new MatTableDataSource(this.userProjects);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  /**
   * This method determines if a trainer can edit a project; a trainer can only edit a project if the project was submitted by the trainer.
   * @param project: the project who's trainer is being validated
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  canEdit(project: any) {
    if (this.currentUser.role === 'ROLE_ADMIN') {
      this.trainerCanEdit = true;
    } else if (this.trainerFullName === project.trainer) {
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
    this.projectService.CurrentProject$ = project;
    this.router.navigate(['/codebase']);
  }

  edit(project) {
    this.router.navigate([project.id + '/edit']);
  }


  swapProject(proj): void {
    this.projectService.CurrentProject$.next(proj);
  }
}
