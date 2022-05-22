import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  api_url = 'http://localhost:8081/api/dashbordcount';

  constructor(private http: HttpClient) {}

  counts(): Observable<any> {
    return this.http.get(this.api_url + '/count');
  }
}
