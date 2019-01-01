import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource,MatIcon } from '@angular/material';

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
  constructor(private router: Router, private viewProjectsService: ProjectService, private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.getAllUsers().subscribe(
      data => {
        console.log(data);
        this.allUsersArray = data;
        this.dataSourceUsers = new MatTableDataSource(this.allUsersArray);
        this.dataSourceUsers.sort = this.sortUsers;
        this.dataSourceUsers.paginator = this.userPaginator;
    });
  }

  applyUserFilter(filterValue: string) {
    this.dataSourceUsers.filter = filterValue.trim().toLowerCase();
  }

  updateToAdmin(user){
    if(user.username==='admin'){
      alert('Nah nah son.')
    }
    else {
    console.log('Clicked');
      //user.role = 'ROLE_ADMIN' + ' special';
      this.userService.updateUserToAdmin(user).subscribe(
        result=> {
          user.role = 'ROLE_ADMIN';
         // alert(user.firstName + ' has been updated to' + user.role)
        },
        err=>{
          user.role = 'ROLE_USER';
         alert(user.firstName + ' role has not been updated Successfully')
        }
      )
      }
  
  }
}
