import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss']
})
export class AppLogoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  homepageShortcut() {
    this.router.navigate(['projects', 'home']);
  }
}
