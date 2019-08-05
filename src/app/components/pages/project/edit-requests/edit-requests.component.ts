import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../models/Project';
import { ProjectService } from 'src/app/services/project.service';

// const OLD: Project;
// const NEW: Project;


@Component({
  selector: 'app-edit-requests',
  templateUrl: './edit-requests.component.html',
  styleUrls: ['./edit-requests.component.scss']
})
export class EditRequestsComponent implements OnInit {
  OLD: Project;
  NEW: Project;


  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.OLD = {
      id: 66,
      name: 'the old one',
      batch: 'java10939may',
      trainer: 'Saint Nick',
      groupMembers: [
        'Aisha',
        'Matt',
        'Tevin',
        'Zak',
      ],
      techStack: 'java, javascript, angular, typescript',
      // status?: string;
      description: 'Lorem ipsum dolor sit amet, probatus sapientem vis no. Est at iisque imperdiet voluptatum. Et putant dolores quo, mel simul nonumes ut. Ad qui fuisset invenire, illum semper has et.'
      }

      this.NEW ={
        id: 34,
        name: 'the new one',
        batch: 'testing2018',
        trainer: 'Homer Simpson',
        groupMembers: [
        'molly',
        'Mike',
        'Taylor',
        'Tim',
      ],
      techStack: 'java, javascript',
      // status?: string;
      description: 'this is a new and improved desciption being used to update project. this is a new and improved desciption being used to update project.this is a new and improved desciption being used to update project.'
      }

      // this.projectService.CurrentProject$.next(this.NEW);

    }
}
