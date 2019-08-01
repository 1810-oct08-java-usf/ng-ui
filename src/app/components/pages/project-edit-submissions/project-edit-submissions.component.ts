import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

export interface EditSubmission {
  editorName: string;
  projectName: string;
  timeOfRequest: string;
}

const ELEMENT_DATA: EditSubmission[] = [
  {editorName: 'Bill', projectName: 'RPM', timeOfRequest: '12:30pm 10/21/19'},
  {editorName: 'Danny', projectName: 'Car Dealership', timeOfRequest: '12:30pm 10/19/19'},
  {editorName: 'Sophie', projectName: 'Hangout', timeOfRequest: '12:30pm 10/15/19'},
  {editorName: 'Zack', projectName: 'Festival', timeOfRequest: '12:30pm 10/19/19'},
  {editorName: 'Dylan', projectName: 'RPM', timeOfRequest: '12:30pm 10/27/19'},
  {editorName: 'Samatha', projectName: 'SOAP', timeOfRequest: '12:30pm 10/24/19'},
  {editorName: 'Bob', projectName: 'TRMS', timeOfRequest: '12:30pm 10/31/19'}
];

@Component({
  selector: 'app-project-edit-submissions',
  templateUrl: './project-edit-submissions.component.html',
  styleUrls: ['./project-edit-submissions.component.scss'],
})


export class ProjectEditSubmissionsComponent implements OnInit {
  displayedColumns: string[] = ['Editor', 'Project', 'Time of Request'];
  displayedColumnsData: string[] = ['Editor', 'Project', 'Time of Request'];
  dataSource =  new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  logData(row) {
    console.log(row);
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

