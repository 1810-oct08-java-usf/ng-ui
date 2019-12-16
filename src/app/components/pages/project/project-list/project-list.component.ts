import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { Project } from 'src/app/models/Project';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ProjectFilterService } from 'src/app/services/project-filter.service';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ProjectListComponent implements OnInit {

    title: string = "Projects" || "My Projects";
    currentUser: User;
    userId: string;
    projectList: Project[] = [];
    filteredProjectList: Project[] = [];
    searchByName = "";
    searchByStatus = "";

    constructor(private router: Router, private userService: UserService,
        private projectService: ProjectService, private filterService: ProjectFilterService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.userService.user.asObservable().subscribe(
            user => {
                if (user) {
                    this.currentUser = user;
                }
            }
        );

        // If the current page is 'projects-user' get the userId
        if (this.router.url.includes('projects-user')) {
            this.userId = this.currentUser.id + "";
            this.title = "My Projects";
        }

        this.projectList = this.loadProjects(this.userId);
        this.filterProjects();
    }



    /* Basically, if the route contains no param for userId, then get all projects;
      else get projects by userId */
    loadProjects(userId): Project[] {
        if (!userId) {
            this.projectService.getProjectByField("status", "Approved").subscribe(proj => {
                this.projectList = proj;
                this.filteredProjectList = proj;
            });
        } else {
            this.projectService.getProjectByField("userId", this.userId).subscribe(proj => {
                this.projectList = proj;
                this.filteredProjectList = proj;
            });
        }
        return this.projectList;
    }

    /**
     * This method filter Projects by name and status.
     */
    filterProjects() {
        this.filteredProjectList = this.projectList;
        if (this.searchByStatus && this.searchByStatus != "All") {
            this.filteredProjectList = this.filterService.filterProjectByStatus(this.filteredProjectList, this.searchByStatus);
        }
        if (this.searchByName.trim() != "") {
            this.filteredProjectList = this.filterService.filterProjectByName(this.filteredProjectList, this.searchByName.toLowerCase());
        }
    }

    /**
     * This method updates the subject CurrentProject in the project service and
     * then navigates to the project-view component which will display the project selected here
     * @param proj 
     */
    swapProject(proj): void {
        this.projectService.CurrentProject$.next(proj);
        this.router.navigate(['/project-view']);
    }
}
