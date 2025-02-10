import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private urlApi = 'http://localhost:5211/api/calculator';
  constructor(private http: HttpClient) {}

  calculate(operation: string): Observable<any> {
    return this.http.post<any>(this.urlApi, { operation });
  }
}
