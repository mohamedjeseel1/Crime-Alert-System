import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  // requestComplaint = new FormGroup({
  //   id: new FormControl(null),
  //   userId: new FormControl('',[Validators.required]),
  //   crimeType: new FormControl('',[Validators.required]),
  //   subject: new FormControl('',[Validators.required, Validators.minLength(6)]),
  //   description: new FormControl('',[Validators.required]),
  //   document:new FormControl(''),
  //   status:new FormControl(''),
  //   location: new FormControl('',[Validators.required]),
  //   updatedAt: new FormControl(''),
  //   createdAt: new FormControl('')
  // })
  // iniform(data:any){
  //   this.requestComplaint.setValue(data);
  // }
  api_url = 'http://localhost:8081/api/report';
  constructor(private http: HttpClient) {}

  getAllReports(): Observable<any> {
    return this.http.get(this.api_url + '/getAllReports');
  }

  createReport(data: any): Observable<any> {
    return this.http.post<any>(this.api_url + '/create', data);
  }
  //call ekk awa
  updateReport(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.api_url + '/updateReport/' + id, data);
  }
  updateStatus(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.api_url + '/update-status/' + id, data);
  }

  deleteReport(complaintId: any): Observable<any> {
    return this.http.delete(this.api_url + '/' + complaintId);
  }
}
