import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';

import { AuthenticationRoutingModule } from 'src/app/authentication/authentication-routing.module';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { LogoutComponent } from 'src/app/authentication/logout/logout.component';
import { RegistrationComponent } from 'src/app/authentication/registration/registration.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MatStepperModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
