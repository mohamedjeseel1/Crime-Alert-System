import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CriminalService {

  api_url = "http://localhost:8081/api/criminal";

  constructor(private http:HttpClient) { }

  getAllCriminals(){
    return this.http.get(this.api_url+'/getAllCriminals');
  }
  createCriminal(data:any):Observable<any>{
    return this.http.post<any>(this.api_url+'/create',data );
  }

  updateCriminal(data:any, id:any):Observable<any>{
    return this.http.put<any>(this.api_url+'/updateCriminal/'+ id,data );
  }


  deleteCriminal(id:any):Observable<any>{
    return this.http.delete(this.api_url+'/'+id);
  }
}
