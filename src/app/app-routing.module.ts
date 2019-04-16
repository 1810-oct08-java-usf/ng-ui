import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';

const routes: Routes = [
  { path: '', loadChildren: './project/project.module#ProjectModule', pathMatch: 'full' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'auth', loadChildren: () => AuthenticationModule},
  { path: 'auth', loadChildren: 'src/app/authentication/authentication.module#AuthenticationModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
