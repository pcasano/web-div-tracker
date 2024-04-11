// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '../assets/response/response.json';

  constructor(private http: HttpClient) {}

//   fetchData(): Observable<any> {
//     return this.http.get<any>(this.apiUrl)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }


fetchData(): Observable<any> {
    console.log("in service function");
    return this.http.get<any>(this.apiUrl);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred while fetching data.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Server returned code ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
