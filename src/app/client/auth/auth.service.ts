import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {of} from "rxjs";
import {CrudService} from "../../server/crud/crud.service";
import {User} from "../../server/crud/user";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private crudService: CrudService) {
  }

  token = 'usertoken123'

  signUp(user: User) {
    //For generating a token I need to use NestJS, therefore I gave a simple token

    this.crudService.post(user).subscribe((res) => {
      localStorage.setItem('user_jwt', JSON.stringify(this.token));
      this.router.navigateByUrl('/users');
      this.snackBar.open('Welcome!', '', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 5000,
        panelClass: 'success'
      })
    })
    return this.token;
  }


  logout() {
    localStorage.removeItem("user_jwt");
    this.router.navigate(['sign-up']);
    this.snackBar.open('Log out successfully', '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'success'
    })

  }

  getToken() {
    return localStorage.getItem("user_jwt");
  }

  isAuthenticated() {
    const jwtSession = localStorage.getItem("user_jwt");

    if (jwtSession) {
      return of(this.getExpiration(jwtSession) >= moment().unix());
    } else {
      return of(false);
    }
  }

  getExpiration(token: string): number {
    // const parsedJwt = this.parseJwt(token);

    // if (parsedJwt) {
    //   return parsedJwt.exp;
    // }

    return moment().unix();
  }

  // parseJwt(token: string) {
  //   let base64Url = token?.split('.')[1];
  //   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload = decodeURIComponent(window.atob(base64)?.split('').map(function (c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //
  //   return JSON.parse(jsonPayload);
  // };
}
