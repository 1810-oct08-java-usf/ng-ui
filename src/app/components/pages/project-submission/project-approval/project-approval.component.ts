import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-approval',
  templateUrl: './project-approval.component.html',
  styleUrls: ['./project-approval.component.scss']
})
export class ProjectApprovalComponent implements OnInit {

  project: Project;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.projectService.CurrentProject$.asObservable().subscribe(
      proj => {
        if (proj) {
          this.project = proj;
        }
      });
  }

  approveProject() {
   this.project.status = 'approved';
   this.projectService.updateProject(this.project, this.project.id).subscribe(response =>{
     console.log(response);
   });
  }

  denyProject() {
    this.project.status = 'denied';
    this.projectService.updateProject(this.project, this.project.id).subscribe(response =>{
      console.log(response);
    });
  }

  updateProject() {
    this.httpClient.post('', this.project).subscribe (response => {
      if (response === true) {
      //  dosomething
      } else {
      //  dosomething
      }
     });
  }
}
