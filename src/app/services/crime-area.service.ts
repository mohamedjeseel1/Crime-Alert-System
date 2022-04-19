import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CrimeAreaService {

  api_url = "http://localhost:8081/api/crimeArea";
  
  constructor(private http:HttpClient) { }

  getAllAreas(): Observable<any>{
    return this.http.get(this.api_url+'/getAllAreas');
  }

  createArea(data:any):Observable<any>{
    return this.http.post(this.api_url+"/create",data);
  }

  updateArea(data:any, id:any):Observable<any>{
    return this.http.put(this.api_url+"/updateArea/",id,data);
  }

  deleteArea( id:any):Observable<any>{
    return this.http.delete(this.api_url+"/"+id);
  }
}
