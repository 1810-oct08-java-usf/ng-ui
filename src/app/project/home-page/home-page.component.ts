import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

/**
 * The Home page contains the navbar and the ability to view projects and their details
 */
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    if (this.userService.getUser() === null) {
      this.router.navigate(['/auth/login']);
    }
  }
}
