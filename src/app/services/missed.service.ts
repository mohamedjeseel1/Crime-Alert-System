import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MissedService {

  api_url = "http://localhost:8081/api/missed";
  constructor(private http:HttpClient) {}

  createMissed(data:any):Observable<any>{
    return this.http.post<any>(this.api_url+'/addMissed',data );
  }
  getAllMisseds(): Observable<any>{
    return this.http.get(this.api_url+'/getAllMisseds');
  }

  updateMissed(data:any, id:any):Observable<any>{
    return this.http.put(this.api_url+'/updateMissed/'+ id,data );
  }

  deleteMissed( id:any):Observable<any>{
    return this.http.delete(this.api_url+"/"+id);
  }
}