var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"home","loadChildren":"./project/project.module#ProjectModule"},{"path":"account","loadChildren":"./account/account.module#AccountModule","children":[{"kind":"module","children":[{"name":"routes","filename":"app/account/account-routing.module.ts","module":"AccountRoutingModule","children":[{"path":":id","component":"ProfileComponent"}],"kind":"module"}],"module":"AccountModule"}]},{"path":"auth","loadChildren":"./authentication/authentication.module#AuthenticationModule","children":[{"kind":"module","children":[{"name":"routes","filename":"app/authentication/authentication-routing.module.ts","module":"AuthenticationRoutingModule","children":[{"path":"login","component":"LoginComponent"},{"path":"logout","component":"LogoutComponent"},{"path":"register","component":"RegistrationComponent"},{"path":"**","redirectTo":"login"}],"kind":"module"}],"module":"AuthenticationModule"}]},{"path":"projects","loadChildren":"./project/project.module#ProjectModule"},{"path":"**","redirectTo":"home"}],"kind":"module"},{"name":"routes","filename":"app/project/project-routing.module.ts","module":"ProjectRoutingModule","children":[{"path":"","component":"HomePageComponent","pathMatch":"full"},{"path":"project_submission","component":"ProjectSubmissionComponent"},{"path":":id/codebase","component":"ZipComponent"},{"path":"**","redirectTo":"home"}],"kind":"module"}]}