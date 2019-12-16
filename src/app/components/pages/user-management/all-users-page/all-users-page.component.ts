import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from 'src/app/models/User';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-all-users-page',
  templateUrl: './all-users-page.component.html',
  styleUrls: ['./all-users-page.component.scss']
})
export class AllUsersPageComponent implements OnInit {
  usersPage = true;
  allUsersArray: User[];
  dataSourceUsers: MatTableDataSource<User>;
  displayedUserColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'role'];
  @ViewChild(MatSort) sortUsers: MatSort;
  @ViewChild(MatPaginator) userPaginator: MatPaginator;
  userSubscription: Subscription;

  retrievingProjects = true;

  constructor(private router: Router, private viewProjectsService: ProjectService, private userService: UserService, private snackbar: SnackbarService) { }

  ngOnInit() {
    // doesn't test if user exists - only if subject was created
    if (!this.userService.user) this.router.navigate(['login']);
    
    if (this.userService.user.value.role === 'ROLE_ADMIN') {
    this.userSubscription = this.userService.getAllUsers().subscribe(
      data => {
        // console.log(data);
        this.retrievingProjects = false;
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
  updateToAdmin(user){
    if(user.username !=='admin') {
      this.userService.updateUserRoles(user).subscribe(
        result => {
          user.role = 'ROLE_ADMIN';
        },
        error => {
          user.role = 'ROLE_USER';
          this.snackbar.openSnackBar(user.firstName + ' role has not been updated Successfully', 'Dismiss');
        }
      );
    }

  }
}