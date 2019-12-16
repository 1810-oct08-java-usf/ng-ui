import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatExpansionModule, MatListModule, MatTooltipModule, MatCardModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ProjectListComponent } from './project-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectService } from 'src/app/services/project.service';
import { MockProjectService } from 'src/app/mocks/mock-project-service';
import { EllipsisPipe } from '../../../../../pipes/ellipsis.pipe';
import { projection, detectChanges } from '@angular/core/src/render3';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { MockUserService } from 'src/app/mocks/mock-user-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


describe('ProjectListComponent', () => {
    let component: ProjectListComponent;
    let fixture: ComponentFixture<ProjectListComponent>;
    let projectService: ProjectService;
    let router: Router;
    let routerSpy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProjectListComponent, EllipsisPipe],
            imports: [MatExpansionModule, RouterTestingModule, HttpClientTestingModule, MatListModule,
                NoopAnimationsModule, MatTooltipModule, MatCardModule, FormsModule, MatFormFieldModule,
                MatOptionModule, MatSelectModule, MatInputModule
            ],
            providers: [{ provide: ProjectService, useClass: MockProjectService },
            { provide: UserService, useClass: MockUserService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        router = TestBed.get(Router);
        routerSpy = spyOn(router, 'navigate').and
            .callFake(function () { return null; });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getProjectByUserID when userId is undefined', () => {
        component.projectList = null;
        projectService = TestBed.get(ProjectService);

        let retVal = component.loadProjects(undefined);
        fixture.detectChanges();

        expect(retVal).toBeTruthy();
    });

    it('should call getAllProjects when userId is not undefined', async(() => {
        component.projectList = null;
        projectService = TestBed.get(ProjectService);

        let retVal = component.loadProjects(true);
        fixture.detectChanges();

        expect(retVal).toBeTruthy();
    }));

    it('should call swap project when expected', async(() => {
        projectService = TestBed.get(ProjectService);
        let project$ = projectService.CurrentProject$;

        let projectSpy = spyOn(project$, 'next');
        component.swapProject(project$);

        expect(routerSpy).toHaveBeenCalledWith(['/project-view']);
    }));

});
