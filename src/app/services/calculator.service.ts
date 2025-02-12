import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private urlApi = environment.apiUrl+'/calculator';
  constructor(private http: HttpClient) {}

  calculate(operation: string): Observable<any> {
    return this.http.post<any>(this.urlApi, { operation });
  }
}
