import { TestBed } from "@angular/core/testing";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";

import { ProjectService } from "./project.service";
import { AppModule } from "../app.module";

/**
 * Not enough time to implement unit tests for http requests and responses. Refer to link below for assistance in writing future tests.
 * https://angular.io/guide/http
 */
describe("ProjectService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, BrowserAnimationsModule, AppModule]
    })
  );

  it("should be created", () => {
    const service: ProjectService = TestBed.get(ProjectService);
    expect(service).toBeTruthy();
  });
});
