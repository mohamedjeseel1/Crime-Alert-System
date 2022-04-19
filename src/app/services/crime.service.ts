import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CrimeService {

  api_url = "http://localhost:8081/api/crime";
  
  constructor(private http:HttpClient) { }

  getAllCrimes(): Observable<any>{
    return this.http.get(this.api_url+'/getAllCrimes');
  }

  createCrime(data:any):Observable<any>{
    return this.http.post(this.api_url+'/create',data);
  }

  updateCrime(data:any,id:any):Observable<any>{
    return this.http.put(this.api_url+'/updateCrime/'+id,data)
  }

  deleteCrime( id:any):Observable<any>{
    return this.http.delete(this.api_url+"/"+id);
  }
}
