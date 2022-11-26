import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  api_url = 'http://localhost:8081/api/contact_us';

  constructor(private http: HttpClient) {}
  getAllMessages(): Observable<any> {
    return this.http.get(this.api_url + '/getAllMessages');
  }

  contactForm(data: any): Observable<any> {
    return this.http.post(this.api_url + '/send', data);
  }

  deleteMessage(id: any): Observable<any> {
    return this.http.delete(this.api_url + '/' + id);
  }

  replyMessage(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.api_url + '/reply/' + id, data);
  }
}
