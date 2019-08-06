import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-grid-page',
  templateUrl: './project-grid-page.component.html',
  styleUrls: ['./project-grid-page.component.scss']
})
export class ProjectGridPageComponent implements OnInit {

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
    if (this.project) {
      this.router.navigate(['/updateform']);
    }
  }

  /**
   * Iff a project is selected, 
   *  updates the view to the codebase view.
   *
   *  @author Michael James | Ashton Sullivan 1906-Java-USF
   */
  codebasePage() {
    if (this.project) {
      this.router.navigate(['/codebase']);
    }
  }
}
