import {NgModule} from '@angular/core';
import {AuthGuard} from './auth-guard.service';
import {AuthService} from './auth.service';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@NgModule({
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  providers: [
    AuthGuard,
    AuthService,
    MatSnackBarModule
  ],
  exports: [],
  declarations: [
    SignUpComponent
  ]
})
export class AuthModule {
}
