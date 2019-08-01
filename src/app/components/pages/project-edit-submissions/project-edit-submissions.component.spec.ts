import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditSubmissionsComponent } from './project-edit-submissions.component';

describe('ProjectEditSubmissionsComponent', () => {
  let component: ProjectEditSubmissionsComponent;
  let fixture: ComponentFixture<ProjectEditSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
