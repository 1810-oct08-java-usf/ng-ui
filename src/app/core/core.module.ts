import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { ProjectService } from './services/project.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ProjectService,
    UserService
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }
}
