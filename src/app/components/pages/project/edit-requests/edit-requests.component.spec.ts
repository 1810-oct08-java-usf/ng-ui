import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestsComponent } from './edit-requests.component';

describe('EditRequestsComponent', () => {
  let component: EditRequestsComponent;
  let fixture: ComponentFixture<EditRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
