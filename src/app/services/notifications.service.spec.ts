import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { NotificationsService } from "./notifications.service";
import { HttpClient } from "selenium-webdriver/http";
import { AppModule } from "../app.module";
import { RouterTestingModule } from "@angular/router/testing";

describe("NotificationsService", () => {
  let injector: TestBed;
  let httpMock: HttpClientTestingModule;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule, HttpClientTestingModule, AppModule], //AuthenticationModule],
      providers: [NotificationsService]
    });
    injector = getTestBed();
    service = injector.get(NotificationsService);
    httpMock = injector.get(HttpClientTestingModule);
    localStorage.setItem("jwt", "testJWT");
  });

  it("should be created", () => {
    const service: NotificationsService = TestBed.get(NotificationsService);
    expect(service).toBeTruthy();
  });
});
