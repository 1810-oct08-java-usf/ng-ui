import { TestBed } from "@angular/core/testing";

import { ProjectFilterService } from "./project-filter.service";

describe("ProjectFilterService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ProjectFilterService = TestBed.get(ProjectFilterService);
    expect(service).toBeTruthy();
  });
});
