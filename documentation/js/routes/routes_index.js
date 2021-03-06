var ROUTES_INDEX = {
  "name": "<root>", "kind": "module", "className": "AppModule", "children": [{
    "name": "routes",
    "filename": "src/app/app-routing.module.ts",
    "module": "AppRoutingModule",
    "children": [{"path": "", "loadChildren": "./project/project.module#ProjectModule", "pathMatch": "full"}, {
      "path": "account",
      "loadChildren": "./account/account.module#AccountModule",
      "children": [{
        "kind": "module",
        "children": [{"name": "routes", "filename": "src/app/account/account-routing.module.ts", "module": "AccountRoutingModule", "children": [{"path": ":id", "component": "ProfileComponent"}], "kind": "module"}],
        "module": "AccountModule"
      }]
    }, {
      "path": "auth",
      "loadChildren": "./authentication/authentication.module#AuthenticationModule",
      "children": [{
        "kind": "module",
        "children": [{
          "name": "routes",
          "filename": "src/app/authentication/authentication-routing.module.ts",
          "module": "AuthenticationRoutingModule",
          "children": [{"path": "login", "component": "LoginComponent"}, {"path": "logout", "component": "LogoutComponent"}, {"path": "register", "component": "RegistrationComponent"}, {"path": "**", "redirectTo": "login"}],
          "kind": "module"
        }],
        "module": "AuthenticationModule"
      }]
    }],
    "kind": "module"
  }, {
    "name": "routes",
    "filename": "src/app/project/project-routing.module.ts",
    "module": "ProjectRoutingModule",
    "children": [{"path": "home", "component": "HomePageComponent"}, {"path": "project_submission", "component": "ProjectSubmissionComponent"}, {"path": ":id/edit", "component": "ProjectEditComponent"}, {
      "path": "codebase",
      "component": "ZipComponent"
    }, {"path": "**", "redirectTo": "home"}],
    "kind": "module"
  }]
}
