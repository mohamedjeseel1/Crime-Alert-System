import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})

export class EmergencyService {

  api_url = "http://localhost:8081/api/emergency";

  constructor(private http:HttpClient) { }

  getAllEmergencies(): Observable<any>{
    return this.http.get(this.api_url+'/getAllEmergencies');
  }

  createEmergency(data:any):Observable<any>{
    return this.http.post(this.api_url+'/create',data);
  }

  updateEmergency(data:any, id:any):Observable<any>{
    return this.http.put<any>(this.api_url+'/updateEmergency/'+ id,data );
  }

  deleteEmergency( id:any):Observable<any>{
    return this.http.delete(this.api_url+"/"+id);
  }

  

}
