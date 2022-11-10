import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {RoleGuard} from "./client/auth/role-guard.service";
import {AuthGuard} from "./client/auth/auth-guard.service";

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./client/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {roles: ['admin']}
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./client/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/users'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

