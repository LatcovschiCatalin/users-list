import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  post(book: User): Observable<User> {
    return this.httpClient.post<User>(this.apiServer + '/posts/', JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getById(id: any): Observable<User> {
    return this.httpClient.get<User>(this.apiServer + '/posts/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  get(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiServer + '/posts/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  put(book: User, id: any): Observable<User> {
    return this.httpClient.put<User>(this.apiServer + '/posts/' + id, JSON.stringify(book), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteById(id: any) {
    return this.httpClient.delete<User>(this.apiServer + '/posts/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

