import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = '../assets/response/response.json';

  constructor(private http: HttpClient) {}


fetchCompany(): Observable<Company> {
    console.log("in service function");
    return this.http.get<Company>(this.apiUrl);
  }
}