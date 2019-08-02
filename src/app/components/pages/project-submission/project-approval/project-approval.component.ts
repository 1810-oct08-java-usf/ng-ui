import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-approval',
  templateUrl: './project-approval.component.html',
  styleUrls: ['./project-approval.component.scss']
})
export class ProjectApprovalComponent implements OnInit {

  project: Project;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit() {
    this.projectService.CurrentProject$.asObservable().subscribe(
      proj => {
        if (proj) {
          this.project = proj;
        }
      });
  }

  updateProject() {
    if (this.project) this.router.navigate(['/updateform']);
  }
}
