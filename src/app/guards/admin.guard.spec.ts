import {
  TestBed,
  async,
  inject,
  ComponentFixture
} from "@angular/core/testing";

import { AdminGuard } from "./admin.guard";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

describe("AdminGuard", () => {
  let component: AdminGuard;
  let router: Router;
  let routerSpy;

  let nonAdminUser = {
    id: 1,
    role: "ROLE_USER"
  };

  let adminUser = {
    id: 1,
    role: "ROLE_ADMIN"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AdminGuard]
    });
    component = TestBed.get(AdminGuard);
    router = TestBed.get(Router);
    routerSpy = spyOn(router, "navigate").and.callFake(function() {
      return null;
    });
  });

  it("should ...", inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));

  it("should return true for Admin user", inject(
    [AdminGuard],
    (guard: AdminGuard) => {
      spyOn(localStorage, "getItem").and.callFake(key => {
        return JSON.stringify(adminUser);
      });
      expect(component.canActivate()).toEqual(true);
    }
  ));

  it("should return false for non-Admin user", inject(
    [AdminGuard],
    (guard: AdminGuard) => {
      spyOn(localStorage, "getItem").and.callFake(key => {
        return JSON.stringify(nonAdminUser);
      });
      expect(component.canActivate()).toEqual(false);
      expect(routerSpy).toHaveBeenCalledWith([""]);
    }
  ));

  it("should return false for logged-out user", inject(
    [AdminGuard],
    (guard: AdminGuard) => {
      spyOn(localStorage, "getItem").and.callFake(key => {
        return null;
      });
      expect(component.canActivate()).toEqual(false);
      expect(routerSpy).toHaveBeenCalledWith([""]);
    }
  ));
});
