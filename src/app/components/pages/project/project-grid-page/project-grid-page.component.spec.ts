import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Router, Route } from '@angular/router';
import { MatCardModule, MatIconModule, MatInputModule, MatOptionModule, MatExpansionModule, MatSelectModule } from '@angular/material';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { BehaviorSubject, of } from 'rxjs';

import { ProjectListComponent } from '../project-list/project-list.component';
import { ProjectInfoComponent } from '../project-info/project-info.component';
import { NgxCarouselComponent } from '../ngx-carousel/ngx-carousel.component';
import { ProjectDescriptionComponent } from '../project-description/project-description.component';
import { EllipsisPipe } from 'src/app/ellipsis.pipe';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Project } from 'src/app/models/Project';
import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ProjectGridPageComponent } from './project-grid-page.component';
import { ProjectWelcomePageComponent } from '../project-welcome-page/project-welcome-page.component';
import { ProjectEditComponent } from '../../project-edit/project-edit.component';
import { HighlightModule } from 'ngx-highlightjs';
import { hljsLanguages } from 'src/app/app.module';
import { CodebaseComponent } from '../../codebase/codebase.component';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';

fdescribe('ProjectGridPageComponent', () => {
  let component: ProjectGridPageComponent;
  let fixture: ComponentFixture<ProjectGridPageComponent>;
  let router: Router;
  let routerSpy;
  let user: User;
  let project: Project;
  let userService: UserService;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGridPageComponent, ProjectListComponent,
        ProjectInfoComponent, NgxCarouselComponent,
        ProjectDescriptionComponent, ProjectWelcomePageComponent, 
        CodebaseComponent, ProjectEditComponent,
        EllipsisPipe ],
      imports: [ MatCardModule, MatIconModule, MatInputModule,
        ReactiveFormsModule, MatOptionModule, 
        MatExpansionModule, MatSelectModule,
        NgxHmCarouselModule, HttpClientTestingModule,
        RouterTestingModule, NoopAnimationsModule,
        FormsModule, ReactiveFormsModule,
        HighlightModule.forRoot({ languages: hljsLanguages }) ],
        schemas: [NO_ERRORS_SCHEMA],
      providers: [ {provide: ProjectService, useClass: MockProjectService},
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    routerSpy = spyOn(router, 'navigate').and.callFake(function() { return null; });

    fixture = TestBed.createComponent(ProjectGridPageComponent);
    component = fixture.componentInstance;
    component.project = project;
  });

  afterEach(() => {
    router = null;
    routerSpy = null;
    fixture = null;
    component = null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be visible', () => {
    let userService = new UserService(http);

    spyOn(userService, 'getCurrentUser').and.returnValue({id: 1,
      firstName: 'mike',
      lastName: 'sam',
      email: 'hello@revature.com',
      username: 'samike',
      password: 'test123',
      role: 'ROLE_ADMIN'});

    let user = userService.getCurrentUser();
    let project = {
      userId: 1
    };
    if (user.id === project.userId || user.role === 'ROLE_ADMIN') {
      expect(fixture.debugElement.query(By.css('#editbtn'))).toBeFalsy();
    }
  });

  fit('should tell ROUTER to navigate when CodeViewerButton is clicked',  async(() => {
      component.viewCodeBase();
      expect(routerSpy).toHaveBeenCalledWith( ['/codebase'] );
  }));

  // it('should tell ROUTER to navigate when ProjectEditComponent is clicked',  async(() => {
  //     component.updateProject();

  //     expect(mockRouter.navigate).toHaveBeenCalledWith( ['/updateform'] );
  // }));

  it('should call viewCodeBase when Code Base button is clicked',  () => {
    fixture.detectChanges();
    
    spyOn( component, 'viewCodeBase').and.callFake(function() { return null; });

    const button = fixture.debugElement.nativeElement.querySelector('#codeBaseButton');
    button.click();

    fixture.detectChanges();

    expect(component.viewCodeBase).toHaveBeenCalled();
  });
  
  it('should call updateProject when Update Project button is clicked',  () => {
    fixture.detectChanges();

    spyOn( component, 'updateProject').and.returnValue(null);

    const button = fixture.debugElement.nativeElement.querySelector('#updateProjectButton');
    button.click();

    fixture.detectChanges();

    expect(component.updateProject).toHaveBeenCalled();
  });

  xit('should be able to Initialize', fakeAsync(() => {
    component.project = null;
    component.ngOnInit();
    tick();
    expect(component.project).toBeTruthy();
  }));
});
