import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ProjectSubmissionComponent, DialogData } from '../project-submission.component';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})

/**
 * This component defines the content and behavior of the input dialog that is used to collect group member and
 * repository links information when a project is submitted
 * @author Sean Doyle (1810-oct22-java-usf)
 */
export class EditDialogComponent implements OnInit {
  /**
   * A coupled string and boolean array which holds copies of the stored user input values and decisions such that
   * if the user is in the middle of editing the item and exists without submitting,
   * the modified value is NOT stored and reverts to the original value.
   *
   * @author Sean Doyle (1810-oct22-java-usf)
   */
  inEditMode: boolean[] = [];
  editedValues: string[] = [];


  /**
   * @param dialogRef : injects a reference to the dialog defined in the class of the project submission component
   * @param data : the data passed to the dialog
   *
   * @author Sean Doyle (1810-Oct22-Java-USF)
   */
  constructor(public dialogRef: MatDialogRef<ProjectSubmissionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): string[] {
    this.dialogRef.close();
    return [];
  }

  /**
   * Method takes in the list item's displayed value,
   * finds the index of that item in the list which is in the data.values, recreates the passed in array
   * with the passed in item removed from the array.
   *
   * @param e The event tied with the remove button for a given list item
   * @author Sean Doyle (1810-Oct22-Java-USF)
   */
  removeItem(e) {
    const indexOfName = this.data.values.indexOf(e.target.id);
    this.data.values = this.data.values.slice(0, indexOfName).concat(this.data.values.slice(indexOfName + 1, this.data.values.length));
    this.editedValues = this.editedValues.slice(0, indexOfName).concat(this.editedValues.slice(indexOfName + 1, this.editedValues.length));
    this.inEditMode = this.inEditMode.slice(0, indexOfName).concat(this.inEditMode.slice(indexOfName + 1, this.inEditMode.length));
  }

  /**
   * Method takes in the list item's displayed value,
   * finds the index of that item in the list which is in the data.values,
   * toggles the edit mode of that item by updating the boolean array.
   *
   * @param e The event tied with the edit button for a given list item
   * @author Sean Doyle (1810-Oct22-Java-USF)
   */
  allowEdit(e) {
    const indexOfName = this.data.values.indexOf(e.target.id);
    this.inEditMode[indexOfName] = !this.inEditMode[indexOfName];
  }

  /**
   * Method takes in the list item's displayed value,
   * finds the index of that item in the list which is in the data.values,
   * stores the edited value for that item as that item (replaces the old value with the new).
   * Note: this method is only called when the user hits enter or clicks the checkmark.
   *
   * @param e The event tied with the checkmark button for a given list item
   * @author Sean Doyle (1810-Oct22-Java-USF)
   */
  modifyField(e) {
    const indexOfName = this.data.values.indexOf(e.target.id);
    this.data.values[indexOfName] = this.editedValues[indexOfName];
    this.inEditMode[indexOfName] = false;
  }

  /**
   * Method stores the user inputted value in the list of items if it is not falsey.
   * Note: this method is only called when the user hits enter or clicks the plus.
   *
   * @param e The event tied with the plus button for the input field
   * @author Sean Doyle (1810-Oct22-Java-USF)
   */
  addItem(e) {
    // The if statement treats undefined, null, and empty values as 'falsey' and there for the if-statement will decline the value
    if (this.data.result) {
      this.data.values.push(this.data.result);
      this.inEditMode.push(false);
      this.editedValues.push(this.data.result);
      // This clears the input field so that it is ready for another input.
      this.data.result = '';
    }
  }

  /**
   * Method stores the user's previous accepted values in our editing array so that
   * if the user wishes to modify multiple stored values at once, they can readily do so.
   * We also set up our boolean array such that we are not in editing mode and we are ready to edit.
   *
   * @author Sean Doyle (1810-Oct22-Java-USF)
   */
  ngOnInit() {
    this.data.values.forEach(index =>
      this.editedValues.push(index),
      this.inEditMode.push(false)
    );
  }
}
