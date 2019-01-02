import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { NgMetaService } from 'ngmeta'; // TODO use to change title to 'Edit | RPM' or something
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Project } from 'src/app/core/models/Project';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})

/* This component adds functionality to edit a project. However, the server is adding an extra header to the response causing the following
    error: The 'Access-Control-Allow-Origin' header contains multiple values 'http://localhost:4200, http://localhost:4200', but only one is allowed.
    This needs to be addressed on the server to move forward. */
export class EditProjectComponent implements OnInit {

  /* This field is initially true since the project contents for a particular project are placed in the form fields using two-way binding when
        ngOnInit() is called and the project is retrieved by id from the server */
  validForm: Boolean = true;

  // projectToUpdate will hold project information for a specific project returned by id and
  // is bound to the information that users enter in the form
  projectToUpdate: Project = {};

  allProjects: Project[];

  /**
   * title, questionType, and result are all passed to a dialog when the user chooses either the group member or the links input field
   * title and questionType represent the information which will displayed in an input dialog
   * result will hold the user's response, either a group member or a link to be validated as a Github repository link
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  title = 'New Group Member';
  questionType = 'Enter the name of the group member';
  result;

  subscription: Subscription; // will be used to subscribe to the results of an observable

  constructor(private router: Router,
    private ngmeta: NgMetaService,
    private projectService: ProjectService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    if (this.userService.getUser() === null) {
      this.router.navigate(['/auth/login']);
    } else {
      this.ngmeta.setHead({ title: 'Edit Project | RPM' });
      this.projectToUpdate.groupMembers = [];
      this.projectToUpdate.screenShots = [];
      this.projectToUpdate.zipLinks = [];

      /**
       * This will retrieve the path variable which corresponds to the id of the project to be edited.
       * ActivatedRoute has an observable called 'params' which provides a means to do this.
       * Once the project id is retrieved from the path, it can be passed to the project service to obtain the project to update.
       *
       *  @author Shawn Bickel (1810-Oct08-Java-USF)
       */
      this.subscription = this.route.params.subscribe(params => {
        // this.projectService.getProjectById(params['id']).pipe(first()).subscribe(projectById => {
        //   this.projectToUpdate = projectById;
        // });
        this.projectService.getAllProjects().pipe(first()).subscribe(allProjects => {
          this.allProjects = allProjects;
          for(var i = 0; i<this.allProjects.length; i++) {
            if(params['id'] == this.allProjects[i].id) {
              this.projectToUpdate = this.allProjects[i];
            }
          }
        })
      });
    }
  }

  /**
   * This method determines if the entire form is valid when focus is removed from an input field
   * @param nameField : the template variable for the name input field which holds validation information
   * @param batchField : the template variable for the batch input field which holds validation information
   * @param trainerField : the template variable for the trainer name input field which holds validation information
   * @param descriptionField : the template variable for the description input field which holds validation information
   * @param techStackField : the template variable for the technology stack input field which holds validation information
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  checkForValidField(nameField, batchField, trainerField, descriptionField, techStackField) {
    if (!nameField.valid || !batchField.valid || !trainerField.valid || !descriptionField.valid || !techStackField.valid) {
      this.validForm = false;
    } else {
      this.validForm = true;
    }
  }

  /**
   * This method is bound to the event that the form is submitted;
   * The updated project is sent to a service where it is sent to the server with an http put method
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  submitForm() {
    this.projectService.updateProject(this.projectToUpdate, this.projectToUpdate.id).subscribe(project => {});
    this.snackBar.open('The edited changes may take time to appear', '', {
      duration: 5000,
    });
    this.router.navigate(['/home']);
  }

  deleteProject() {
    this.projectService.deleteProjectById(this.projectToUpdate.id).subscribe(hello => {
      this.router.navigate(['home']);
    }, helloTwo => {

    })
  }


}
