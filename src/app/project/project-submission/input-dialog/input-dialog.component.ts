import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProjectSubmissionComponent, DialogData } from '../project-submission.component';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})

/**
 * This component defines the content and behavior of the input dialog that is used to collect group member and
 * repository links information when a project is submitted
 * @author Shawn Bickel (1810-Oct08-Java-USF)
 */
export class InputDialogComponent implements OnInit {

  /**
   * @param dialogRef : injects a reference to the dialog defined in the class of the project submission component
   * @param data : the data passed to the dialog
   *
   * @author Shawn Bickel (1810-Oct08-Java-USF)
   */
  constructor(public dialogRef: MatDialogRef<ProjectSubmissionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
