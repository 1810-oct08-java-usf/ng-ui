import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { User } from '../../../../models/User';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }



let ELEMENT_DATA: User[] = [
  //{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  // { id: 5, firstName: 'Zak', lastName: 'Noori', email: 'asdlkhl', username: 'user', role: 'aaaaaa'},
  // { id: 7, firstName: 'Zasdasda', lastName: 'Noasda', email: 'ahl', username: 'user2', role: 'zzzzz'},
  // { id: 7, firstName: 'Zasdasda', lastName: 'Noasda', email: 'ahl', username: 'user2', role: 'zzzzz'},
  // { id: 7, firstName: 'Zasdasda', lastName: 'Noasda', email: 'ahl', username: 'user2', role: 'zzzzz'},
  // { id: 7, firstName: 'Zasdasda', lastName: 'Noasda', email: 'ahl', username: 'user2', role: 'zzzzz'}
];

let updatedRoles: User[] = [
];


@Component({
  selector: 'app-change-roles',
  templateUrl: './change-roles.component.html',
  styleUrls: ['./change-roles.component.scss']
})
export class ChangeRolesComponent implements OnInit {
   roles: String[] = [
    'admin',
    'user'
  ];

  displayedColumns: string[] = ['ID#', 'Name', 'Role', 'Username', 'Email'];
  displayedColumnsData: string[] = ['id', 'firstName', 'lastName', 'email', 'username', 'role'];
  dataSource =  new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private userServ: UserService) { }


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log("yo");
    this.userServ.getAllUsers().subscribe(users => {
      ELEMENT_DATA = users;
      console.log("hi");
    });

  }

  logData(row) {
   // console.log(row);
  }

  userChanged(user) {
   // console.log(user);
    if (!updatedRoles.includes (user)) {
    updatedRoles.push(user);
   // console.log(updatedRoles);
    }
  }

  postChanges() {
    console.log("beginning of postchanges");
    updatedRoles.forEach(user => {
      this.userServ.updateProfile(user).subscribe(response => {console.log (response)});
      console.log("end of changes");
    });
  }

  test() {
    console.log(updatedRoles);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
