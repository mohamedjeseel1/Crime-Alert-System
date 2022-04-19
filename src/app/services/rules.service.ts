import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
 
  api_url = "http://localhost:8081/api/rule";
  constructor(private http:HttpClient) {}

  getAllRules(): Observable<any>{
    return this.http.get(this.api_url+'/getAllRules');
  }

  getOneRule(data:any, id:any):Observable<any>{
    return this.http.put<any>(this.api_url+'/getOneRule/'+ id,data );
  }

  createRule(data:any):Observable<any>{
    return this.http.post<any>(this.api_url+'/create',data );
  }

  updateRule(data:any, id:any):Observable<any>{
    return this.http.put<any>(this.api_url+'/updateRule/'+ id,data );
  }

  deleteRule( id:any):Observable<any>{
    return this.http.delete(this.api_url+"/"+id);
  }
}
