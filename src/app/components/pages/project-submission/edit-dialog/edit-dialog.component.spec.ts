import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditDialogComponent } from "./edit-dialog.component";
import {
  MatDialogModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatDialogRef,
  MatDialog,
  MatOptionModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MAT_DIALOG_DATA,
  MatSnackBar,
  MatInputModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ProjectSubmissionPageComponent,
  DialogData
} from "../project-submission-page/project-submission-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("EditDialogComponent", () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy("close")
  };
  const data: DialogData = {
    title: "Test",
    questionType: "Test question type",
    result: "Test result",
    values: ["Test values"]
  };
  const mockSnackBar = {
    close: jasmine.createSpy("close")
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditDialogComponent, ProjectSubmissionPageComponent],
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatTooltipModule,
        MatSelectModule,
        MatCardModule,
        MatProgressSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
