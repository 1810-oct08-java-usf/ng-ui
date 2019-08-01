import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRolesComponent } from './change-roles.component';

describe('ChangeRolesComponent', () => {
  let component: ChangeRolesComponent;
  let fixture: ComponentFixture<ChangeRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
