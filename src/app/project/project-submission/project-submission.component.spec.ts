import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';

import { ProjectSubmissionComponent } from './project-submission.component';
import { AppModule } from 'src/app/app.module';

/**
 * This test suite serves to check the proper creation of the ProjectSubmission
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 */
describe('ProjectSubmissionComponent', () => {
  let component: ProjectSubmissionComponent;
  let fixture: ComponentFixture<ProjectSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
