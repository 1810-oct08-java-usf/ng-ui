import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebaseComponent } from './codebase.component';

describe('CodebaseComponent', () => {
  let component: CodebaseComponent;
  let fixture: ComponentFixture<CodebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
