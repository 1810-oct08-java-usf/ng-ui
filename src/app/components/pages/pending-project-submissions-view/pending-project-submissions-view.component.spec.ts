import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProjectSubmissionsViewComponent } from './pending-project-submissions-view.component';

describe('PendingProjectSubmissionsViewComponent', () => {
  let component: PendingProjectSubmissionsViewComponent;
  let fixture: ComponentFixture<PendingProjectSubmissionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingProjectSubmissionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingProjectSubmissionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
