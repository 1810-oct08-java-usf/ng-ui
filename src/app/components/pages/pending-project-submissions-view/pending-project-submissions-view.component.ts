import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import {Router} from '@angular/router';
import { Project } from 'src/app/models/Project';


@Component({
  selector: 'app-pending-project-submissions-view',
  templateUrl: './pending-project-submissions-view.component.html',
  styleUrls: ['./pending-project-submissions-view.component.scss']
})
export class PendingProjectSubmissionsViewComponent implements OnInit {

  dataSource: Project[];
  selected: boolean;
  displayedColumns: string[] = ['Trainer', 'Project', 'Status of Request'];
  displayedColumnsData: string[] = ['trainer', 'name', 'status'];

  constructor(private router: Router, private projectService: ProjectService) {
  }

  ngOnInit() {
    this.selected = false;
    this.projectService.getProjectsByStatus().subscribe(response => {
      this.dataSource = response;
    });
    //    this.dataSource = [];
    // this.dataSource.push({
    //      id: 66,
    //      name: 'the first one',
    //      batch: 'java10939may',
    //      trainer: 'Saint Nick',
    //      status: 'pending',
    //      groupMembers: [
    //        'Aisha',
    //        'Matt',
    //        'Tevin',
    //        'Zak',
    //      ],
    //      techStack: 'java, javascript, angular, typescript',
    //      // status?: string;
    //      description: 'Lorem ipsum dolor sit amet, probatus sapientem vis no. Est at iisque imperdiet voluptatum. Et putant dolores quo, mel simul nonumes ut. Ad qui fuisset invenire, illum semper has et.'
    //      });
  //   this.dataSource = [];
  //  this.dataSource.push({
  //    id: 66,
  //    name: 'the first one',
  //    batch: 'java10939may',
  //    trainer: 'Saint Nick',
  //    status: 'pending',
  //    groupMembers: [
  //      'Aisha',
  //      'Matt',
  //      'Tevin',
  //      'Zak',
  //    ],
  //    techStack: 'java, javascript, angular, typescript',
  //    // status?: string;
  //    description: 'Lorem ipsum dolor sit amet, probatus sapientem vis no. Est at iisque imperdiet voluptatum. Et putant dolores quo, mel simul nonumes ut. Ad qui fuisset invenire, illum semper has et.'
  //    });
  //    this.dataSource.push({
  //      id: 66,
  //      name: 'the second one',
  //      batch: 'java10939may',
  //      trainer: 'Saint Nick',
  //      status: 'approved',
  //      groupMembers: [
  //        'Aisha',
  //        'Matt',
  //        'Tevin',
  //        'Zak',
  //      ],
  //      techStack: 'java, javascript, angular, typescript',
  //      // status?: string;
  //      description: 'Desc #2: Lorem ipsum dolor sit amet, probatus sapientem vis no. Est at iisque imperdiet voluptatum. Et putant dolores quo, mel simul nonumes ut. Ad qui fuisset invenire, illum semper has et.'
  //      });
  }
  swapProject(row): void {
    this.selected = true;
    console.log(this.selected);
    this.projectService.CurrentProject$.next(row);
  }
}
