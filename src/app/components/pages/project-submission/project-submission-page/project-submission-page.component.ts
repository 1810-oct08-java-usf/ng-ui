import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgMetaService} from 'ngmeta';
import {MatDialog} from '@angular/material';
import {ProjectService} from 'src/app/services/project.service';
import {UserService} from 'src/app/services/user.service';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {FormBuilder} from '@angular/forms';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import {Project} from 'src/app/models/Project';
import {User} from 'src/app/models/User';

export interface DialogData {
  title: string;
  questionType: string;
  result: string;
  values: string[];
}

@Component({
  selector: 'app-project-submission-page',
  templateUrl: './project-submission-page.component.html',
  styleUrls: ['./project-submission-page.component.scss']
})
export class ProjectSubmissionPageComponent implements OnInit {

  projectToUpload: Project = {};
  user: User;

  /**
   * GroupMemberString and zipLinkString are both bound to the user's input of the group member field and the zip links field
   * When a new group member or zip link is added, then that information is concatenated to the string.
   * Because of two-way binding, the result is placed in either the group member field or the zip links field
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  groupMemberString: string = '';
  zipLinksString: string = '';

  //Other fields
  screenshotPicList = [];
  techStackList = ['Java/J2EE', 'PEGA', 'JavaScript MVC', '.Net', 'React.js', 'Java', 'iOS9'];
  invalidLink: boolean;
  submitting = false;

  constructor(
    private router: Router,
    private ngmeta: NgMetaService,
    private dialog: MatDialog,
    private projectService: ProjectService,
    private userService: UserService,
    private snackbar: SnackbarService,
    private formBuilder: FormBuilder
  ) { }

  imagePath;

  ngOnInit() {

    if (!localStorage.getItem('jwt')) this.router.navigate(['/auth/login']);

    this.userService.user.asObservable().subscribe(
      user => {
        this.user = user;
        this.projectToUpload.trainer = this.user.firstName + ' ' + this.user.lastName;
      }
    )

    this.ngmeta.setHead({ title: 'Submit | RPM' });

    this.projectToUpload.groupMembers = [];
    this.projectToUpload.screenShots = [];
    this.projectToUpload.zipLinks = [];
    this.projectToUpload.dataModel = [];
  }

/**
 * This method opens the dialog defined in the edit-dialog component, which is decided by
 * the field id of which the user accesses this method from, using If/Else statements.
 * After the dialog is closed, the user's updated data is populated in the groupMembers array.
 *
 * @param e: the event of clicking either the group member or zip links fields, which both trigger the dialog to open
 * @author Sean Doyle (1810-Oct22-Java-USF)
 * @author Justin Kerr, Rodel Flores (190422-Java-USF)
 */
  openEditableDialog(e) {

    let title, questionType, width, values;

    if (e.target.id === 'inputGroupMembers') {
      title = 'New Group Member';
      questionType = 'Enter the name of the group member';
      width = 300;
      values = this.projectToUpload.groupMembers;
    }
    else if (e.target.id === 'inputGithubLink') {
      title = 'Repository Link';
      questionType = 'Enter the Github URL of your repository';
      width = 500;
      values = this.projectToUpload.zipLinks;
    }

    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: width + 'px',
      data: { title: title, questionType: questionType, values: values }
    });

    dialogRef.afterClosed().subscribe(

      result => {
        if (result) {
          if (e.target.id === 'inputGroupMembers') {
            this.projectToUpload.groupMembers = result;
            this.groupMemberString = this.projectToUpload.groupMembers.join(', ');
          }
          else if (e.target.id === 'inputGithubLink') {
            this.projectToUpload.zipLinks = result;
            this.zipLinksString = this.projectToUpload.zipLinks.join(', ');

          }
        }
      });
  }

  /**
   * When the file input is triggered, the event is passed to this method,
   * which uses the properties of the event to retrieve the files chosen and
   * places them in the array corresponding to the screenShots/dataModel array of the project to be submitted.
   *
   * This method will validate:
   * Upload limits - If the screenshots and data models uploaded exceed a certain amount,
   *    this method opens a snackbar message to notify the user and will not add the file to the project.
   * File size - If the file is too large, this mothod opens a snackbar message to notify the user
   *    and will not the file to the project.
   * 
   * @param e the event corresponding to the user choosing a file to uplodad
   * @author Justin Kerr, Rodel Flores (190422-Java-USF)
   */
  imgURL: any;
  screenshotCap: number = 4;
  dataModelCap: number = 6;
  fileSizeCap: number = 1000000; //1 MB
  onFileSelected(e, inputfield) {

    //Check for limits reached
    if (inputfield === 'scs' && this.projectToUpload.screenShots.length == this.screenshotCap) {
      this.snackbar.openSnackBar('Max limit of ' + this.screenshotCap + ' reached.', 'Dismiss');
      return;
    }

    if (inputfield === 'dms' && this.projectToUpload.dataModel.length == this.dataModelCap) {
      this.snackbar.openSnackBar('Max limit of ' + this.dataModelCap + ' reached.', 'Dismiss');
      return;

    }

    for (let i = 0; i < e.target.files.length; i++) {

      if (e.target.files[i].size > this.fileSizeCap) {
        this.snackbar.openSnackBar('File size exceeds 1 MB', 'dismiss');
        return;
      }
      if (inputfield === 'scs') {
        this.projectToUpload.screenShots.push(e.target.files[i]);
        if (!this.projectToUpload.screenShots.includes(e.target.files[i])) this.removeData(e.target.files[i], 'scs');
      }
      else if (inputfield === 'dms') this.projectToUpload.dataModel.push(e.target.files[i]);
    }

    if ( this.projectToUpload.screenShots.includes(e.target.files[0]) ) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (_event) => {
        this.screenshotPicList.push(reader.result);
      }
    }

  }

  /**
   * This method finds the index of the file within projectToUpload that was previously
   * uploaded to the form and removes it using a basic splice method.
   * It also removes the picture from the screenshots array.
   * It will similarly remove data model files from its own array.
   *
   * Currently, if the user removes a file and sequentially try to add the same one back, it will not upload.
   * However, if the user tries to add another file and then retry adding the previously-deleted file, it will upload.
   * In general, if the user attempts to upload the same file sequentially, it will no upload, and the system doesn't throw an error.
   *
   * @param file: the file that was uploaded to the form
   * @author Justin Kerr, Rodel Flores (190422-Java-USF)
   */
  removeData(file: File, inputfield) {
    let list;
    let piclist;
    if (inputfield === 'scs') {
      list = this.projectToUpload.screenShots;
      piclist = this.screenshotPicList;
    }
    if (inputfield === 'dms') {
      list = this.projectToUpload.dataModel;
      piclist = null;
    }

    const index: number = list.indexOf(file);
    if (index !== -1) {
      list.splice(index, 1);
      if (piclist) piclist.splice(index, 1);
    }
  }

  /**
   * This method is bound to the submission of the form
   * All the data from the form is placed as key-value pairs into a FormData object.
   * This FormData object is then sent to the project service for communication with the server.
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   * @author Justin Kerr, Rodel Flores (190422-Java-USF)
   */
  submitForm() {
    this.submitting = true;

    let formData = new FormData();
    formData.append('name', this.projectToUpload.name);
    formData.append('batch', this.projectToUpload.batch);
    formData.append('trainer', this.projectToUpload.trainer);
    formData.append('techStack', this.projectToUpload.techStack);
    formData.append('description', this.projectToUpload.description);
    formData.append('status', 'pending');

    // elements of an array are appended to the FormData object using the same key name
    for (let i = 0; i < this.projectToUpload.groupMembers.length; i++) {
      formData.append('groupMembers', this.projectToUpload.groupMembers[i]);
    }

    for (let j = 0; j < this.projectToUpload.screenShots.length; j++) {
      formData.append('screenShots', this.projectToUpload.screenShots[j]);
    }

    for (let k = 0; k < this.projectToUpload.zipLinks.length; k++) {
      formData.append('zipLinks', this.projectToUpload.zipLinks[k]);
    }

    for (let l = 0; l < this.projectToUpload.dataModel.length; l++) {
      formData.append('dataModel', this.projectToUpload.dataModel[l]);

    }

    this.projectService.createProject(formData).subscribe(
      project => {
        this.snackbar.openSnackBar('Success!!', 'Dismiss');
        this.submitting = false;
        this.router.navigate(['projects/1']);
      },
      error => {
        this.submitting = false;
        if (error.status === 400) {
          this.snackbar.openSnackBar('Bad Request - Please try again.', 'Dismiss');
        }
        if (error.status === 500) {
          this.snackbar.openSnackBar('Internal server error!', 'Dismiss');
        }
      });
  }
}
