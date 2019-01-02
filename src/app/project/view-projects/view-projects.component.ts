import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, NavigationEnd, RoutesRecognized, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import {filter, pairwise} from 'rxjs/operators';

import { Observable } from 'rxjs';

import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss'],
})

export class ViewProjectsComponent implements OnInit {
  usersPage = true;
  projectsPage = false;
  userProjectsPage = false;
  currentUser: User;
  constructor(private router: Router, private viewProjectsService: ProjectService, private userService: UserService) { }

  /**
   * this is a lifecycle method called once by Angular after ngOnChanges(); it should be used to perform intialization logic;
   * the content of the method includes a call to a service to consume information from an endpoint to retrieve all projects; an observable
   * is subscribed to and the returned projects are placed in an array to be displayed in a mat table
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  ngOnInit() {
    this.currentUser = this.userService.getUser();
    if(sessionStorage.getItem('lastPage') == 'project_Submit') {
      sessionStorage.removeItem('lastPage');
      this.yourProjects();
    }
  }

  /**
   * This method well either show the all users table or projects tables using *ngIf's in html
   * @author Michael Grammens (1810-Oct22-Java-USF)
   */
  allUsers() {
    this.usersPage = true;
    this.projectsPage = false;
    this.userProjectsPage = false;
  }
  projects() {
    this.usersPage = false;
    this.projectsPage = true;
    this.userProjectsPage = false;
  }
  yourProjects() {
    this.usersPage = false;
    this.projectsPage = false;
    this.userProjectsPage = true;
  }
  submitProject() {
    this.router.navigate(['/project_submission']);
  }
}
