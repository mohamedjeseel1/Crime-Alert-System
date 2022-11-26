import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  api_url = 'http://localhost:8081/api/station';

  constructor(private http: HttpClient) {}

  getAllStations(): Observable<any> {
    return this.http.get(this.api_url + '/getAllStations');
  }

  createStation(data: any): Observable<any> {
    return this.http.post(this.api_url + '/create', data);
  }

  updateStation(data: any, id: any): Observable<any> {
    return this.http.put(this.api_url + '/updateStation/' + id, data);
  }

  deleteStation(id: any): Observable<any> {
    return this.http.delete(this.api_url + '/' + id);
  }

  // crimesCountByCategory(): Observable<any> {
  //   return this.http.get(this.api_url + '/crimes_countBy_category');
  // }
}
