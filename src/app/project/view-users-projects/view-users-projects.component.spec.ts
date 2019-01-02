import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUsersProjectsComponent } from './view-users-projects.component';

describe('ViewUsersProjectsComponent', () => {
  let component: ViewUsersProjectsComponent;
  let fixture: ComponentFixture<ViewUsersProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsersProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
