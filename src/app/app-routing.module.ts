import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';

import { UserGuard } from './user.guard';
import { LoginGuard } from './login.guard';
import { AdminGuardGuard } from './admin-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      LoginGuard
    ]
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [
      AdminGuardGuard
    ]
  },
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [
      UserGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
