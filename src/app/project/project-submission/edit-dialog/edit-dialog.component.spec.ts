import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'src/app/shared/shared.module';
import { AppModule } from 'src/app/app.module';
import { ProjectModule } from '../../project.module';
import { ProjectService } from 'src/app/core/services/project.service';

import { EditDialogComponent } from './edit-dialog.component';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';

import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [MatDialogModule, SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule, ProjectModule, AuthenticationModule],
      providers: [ProjectService, {provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
