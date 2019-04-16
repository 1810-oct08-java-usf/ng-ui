import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { AppModule} from '../../app.module';
import { ViewProjectsLogicComponent } from './view-projects-logic.component';
import { Project } from 'src/app/core/models/Project';



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
  let router: Router;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ SharedModule, RouterTestingModule, BrowserAnimationsModule, AppModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectsLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * the tested method should navigate to /codebase
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to codebase', () => {
    
    let testProject: Project;
    testProject ={
      id: 1
    }
    let navigateSpy = spyOn(router, 'navigate');

    component.codebase(testProject);
    
    expect(navigateSpy).toHaveBeenCalledWith(['/codebase']);
  });

  /**
   * the tested method should navigate to /edit
   * 
   * @author Alex Johnson (190107-Java-Spark-USF)
   */
  it('should navigate to edit', () => {
    
    let testProject: Project;
    testProject ={
      id: 1
    }
    let navigateSpy = spyOn(router, 'navigate');

    component.edit(testProject);

    expect(navigateSpy).toHaveBeenCalledWith([testProject.id + '/edit']);
  })

});
