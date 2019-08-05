import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {
  project: Project;
  currentUser: User;
  trainerFullName;

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.user.asObservable().subscribe(
      user => {
        if (user) {
        this.currentUser = user;
        this.trainerFullName = this.currentUser.firstName.trim() + ' ' + this.currentUser.lastName.trim();
        }
      }
    );
    this.projectService.CurrentProject$.asObservable().subscribe(
      proj => {
        if (proj.trainer === this.trainerFullName) {
          this.project = proj;
        }
      });
  }

  updateProject() {
    if (this.project) this.router.navigate(['/updateform']);
  }

}
