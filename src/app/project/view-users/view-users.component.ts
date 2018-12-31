import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {
  usersPage = true;
  allUsersArray: User[];
  dataSourceUsers: MatTableDataSource<User>;
  displayedUserColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'role'];
  @ViewChild(MatSort) sortUsers: MatSort;
  @ViewChild(MatPaginator) userPaginator: MatPaginator;
  userSubscription: Subscription;
  currentUser: User;

  constructor(private router: Router, private viewProjectsService: ProjectService, private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.userService.getUser();
    // console.log(this.currentUser.role);
    if (this.currentUser.role === 'ROLE_ADMIN') {
      this.userSubscription = this.userService.getAllUsers().subscribe(
        data => {
          // console.log(data);
          this.allUsersArray = data;
          this.dataSourceUsers = new MatTableDataSource(this.allUsersArray);
          this.dataSourceUsers.sort = this.sortUsers;
          this.dataSourceUsers.paginator = this.userPaginator;
      });
    }
  }

  applyUserFilter(filterValue: string) {
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
  }
}
