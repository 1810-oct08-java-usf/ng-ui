import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgMetaService} from 'ngmeta'; // TODO use to change title to 'Edit | RPM' or something
import {ProjectService} from 'src/app/services/project.service';

@Component({
  selector: 'app-codebase',
  templateUrl: './codebase.component.html',
  styleUrls: ['./codebase.component.scss']
})
export class CodebaseComponent implements OnInit {

  constructor(private router: Router,
    private ngmeta: NgMetaService,
    private projectService: ProjectService,
    private route: ActivatedRoute) {
}

  ngOnInit() {
  }

  back() {
    sessionStorage.setItem('lastPage', 'edit');
    this.router.navigate(['projects/1']);
  }

}
