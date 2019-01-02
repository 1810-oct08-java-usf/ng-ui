import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectsLogicComponent } from './view-projects-logic.component';

describe('ViewProjectsLogicComponent', () => {
  let component: ViewProjectsLogicComponent;
  let fixture: ComponentFixture<ViewProjectsLogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProjectsLogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectsLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
