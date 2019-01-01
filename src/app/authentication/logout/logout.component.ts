import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
    if (this.userService.getUser() !== null) {
      this.userService.logout();
      router.navigate(['/auth/login']);
    }
  }

  ngOnInit() {
  }
}
