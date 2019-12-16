import { TestBed, async, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("AuthGuard", () => {
  let component: AuthGuard;
  let router: Router;
  let routerSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    component = TestBed.get(AuthGuard);
    router = TestBed.get(Router);
    routerSpy = spyOn(router, "navigate").and.callFake(function() {
      return null;
    });
  });

  it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it("should return true when there is a jwt key at localstorage", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      spyOn(localStorage, "getItem").and.callFake(key => {
        return "ajwtKey";
      });
      expect(component.canActivate()).toEqual(true);
    }
  ));

  it("should return false when there is not any jwt key at localstorage", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      spyOn(localStorage, "getItem").and.callFake(key => {
        return null;
      });
      expect(component.canActivate()).toEqual(false);
      expect(routerSpy).toHaveBeenCalledWith(["login"]);
    }
  ));
});
