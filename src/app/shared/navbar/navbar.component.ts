import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User = {};

  constructor(private router: Router, private userservice: UserService) { }

  goToRegister() {
    this.router.navigate(['auth', 'register']);
  }

  goToLogin() {
    this.router.navigate(['auth', 'login']);
  }

  userAccount() {
    this.router.navigate(['account', this.user.id]);
  }

  logout() {
    this.userservice.logout();
    this.router.navigate(['auth/login']);
  }

  ngOnInit() {
    this.user = this.userservice.getUser();
  }

  homepageShortcut() {
    this.router.navigate(['projects', 'home']);
  }
}
