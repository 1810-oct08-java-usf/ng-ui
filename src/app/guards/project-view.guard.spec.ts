import { TestBed, async, inject } from "@angular/core/testing";

import { ProjectViewGuard } from "./project-view.guard";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ProjectService } from "../services/project.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

describe("ProjectViewGuard", () => {
  let component: ProjectViewGuard;
  let router: Router;
  let routerSpy;
  let projectService: ProjectService;

  const mockHttp = {
    get: () => {
      return new Observable<any>(subscriber => {
        subscriber.next({});
      });
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProjectViewGuard,
        ProjectService,
        { provide: HttpClient, useValue: mockHttp }
      ]
    });
    component = TestBed.get(ProjectViewGuard);
    router = TestBed.get(Router);
    routerSpy = spyOn(router, "navigate").and.callFake(function() {
      return null;
    });
    projectService = TestBed.get(ProjectService);
  });

  it("should ...", inject([ProjectViewGuard], (guard: ProjectViewGuard) => {
    expect(guard).toBeTruthy();
  }));

  it("should return false when CurrentProject$.value returns null", inject(
    [ProjectViewGuard],
    (guard: ProjectViewGuard) => {
      projectService.CurrentProject$.next(null);
      expect(component.canActivate()).toEqual(false);
      expect(routerSpy).toHaveBeenCalledWith([""]);
    }
  ));

  it("should return true when CurrentProject$.value returns a project", inject(
    [ProjectViewGuard],
    (guard: ProjectViewGuard) => {
      projectService.CurrentProject$.next({ id: 1, name: "Project Name" });
      expect(component.canActivate()).toEqual(true);
    }
  ));
});
