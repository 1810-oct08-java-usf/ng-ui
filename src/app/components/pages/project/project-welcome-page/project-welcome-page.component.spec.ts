import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWelcomePageComponent } from './project-welcome-page.component';

describe('ProjectWelcomePageComponent', () => {
  let component: ProjectWelcomePageComponent;
  let fixture: ComponentFixture<ProjectWelcomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectWelcomePageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectWelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title text correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Revature Project Manager');
  });

  it('should display description text correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('The Revature Project Management (RPM) system is a web application that can be used to record metadata information regarding completed full-stack projects. Authenticated users can submit project information, which is then approved by an administrator. Using repository links provided during project submission, project codebases will be pulled and made available for viewing. This application will provide administrators the ability to deploy the application onto dynamically allocated cloud resources so that it can be evaluated in the state it was in during its original presentation.');
  });
});
