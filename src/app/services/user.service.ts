import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url = "http://localhost:8081/api/user";
  constructor(private http:HttpClient) {}

  rule(){
    return this.http.get(this.api_url);
  }

  register(data:any):Observable<any>{
    return this.http.post(this.api_url+'/register',data);
  }

  getAllUsers():Observable<any>{
    return this.http.get(this.api_url+'/getAllusers');
  }

  deleteUser( id:any):Observable<any>{
    return this.http.delete(this.api_url+"/"+id);
  }

  // login
  login(username:string, password:any):Observable<any>{
    return this.http.post(this.api_url+'/login',{username,password});    
  }

}
