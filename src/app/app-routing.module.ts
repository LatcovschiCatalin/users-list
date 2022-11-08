import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./client/users/users.module').then(m => m.UsersModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

