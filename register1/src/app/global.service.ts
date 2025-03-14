// src/app/global.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://full.faedg.com/public/api';

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/client/customer_register`, userData);
  }
}
