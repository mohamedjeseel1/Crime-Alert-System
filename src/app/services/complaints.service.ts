import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsService {
  requestComplaint = new FormGroup({
    id: new FormControl(''),
    userId: new FormControl('', [Validators.required]),
    crimeType: new FormControl('', [Validators.required]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    description: new FormControl('', [Validators.required]),
    document: new FormControl(''),
    status: new FormControl('pending'),
    location: new FormControl('', [Validators.required]),
    updatedAt: new FormControl(''),
    createdAt: new FormControl(''),
  });
  iniform(data: any) {
    this.requestComplaint.setValue(data);
  }
  api_url = 'http://localhost:8081/api/complaint';
  constructor(private http: HttpClient) {}

  getAllComplaints(): Observable<any> {
    return this.http.get(this.api_url + '/getAllComplaints');
  }

  getComplaintByStatus(status: string): Observable<any> {
    return this.http.get(this.api_url + '/get-by-status/' + status);
  }

  createComplaint(data: any): Observable<any> {
    return this.http.post<any>(this.api_url + '/create', data);
  }
  updateComplaint(data: any, id: any): Observable<any> {
    let url1 = this.api_url + '/updateComplaint/' + id;
    return this.http.put<any>(url1, data);
  }
  updateStatus(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.api_url + '/update-status/' + id, data);
  }

  deleteComplaint(id: any): Observable<any> {
    return this.http.delete(this.api_url + '/' + id);
  }

  ComplaintsCountByDate(year: number, month: number): Observable<any> {
    return this.http.get(
      this.api_url + '/complaints_countBy_date/' + year + '/' + month
    );
  }
}
