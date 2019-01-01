import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './project/project.module#ProjectModule', pathMatch: 'full' },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'auth', loadChildren: './authentication/authentication.module#AuthenticationModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
