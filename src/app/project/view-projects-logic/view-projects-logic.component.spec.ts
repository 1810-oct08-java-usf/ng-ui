import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { ViewProjectsLogicComponent } from './view-projects-logic.component';



/**
 * This test suite serves to check the proper creation of the ViewProjects
 * component as well the as well as the functionality
 * of the various methods within it.
 * @author Ryan Beevers | Shawn Bickel | Sahil Makhijani | Andrew Mitchem | Yuki Mano | Jeffly Luctamar | (1810-Oct08-Java-USF)
 * @author Ryan Williams | Michael Grammens | (1810-Oct22-Java-USF)
 */

describe('ViewProjectsLogicComponent', () => {
  let component: ViewProjectsLogicComponent;
  let fixture: ComponentFixture<ViewProjectsLogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule]
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

  it('should approve a project', () => {
    let project = {
      status: 'Approved',
      approvingProject: true
    }
    let event = new MouseEvent('click');
    let spy = spyOn(event, 'stopPropagation'); 

    component.approve(project, event);
    expect(spy).toHaveBeenCalled();
    expect(project.status).toBe('Approved');
    expect(project.approvingProject).toBeTruthy();
  });

  it('should decline a project', () => {
    let project = {
      status: 'Denied',
      approvingProject: true
    }
    let event = new MouseEvent('click');
    let spy = spyOn(event, 'stopPropagation'); 

    component.decline(project, event);
    expect(spy).toHaveBeenCalled();
    expect(project.status).toBe('Denied');
    expect(project.approvingProject).toBeTruthy();
  });
});
