import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  

  baseUrl: string= "http://localhost:3000/member/member";
  IdUrl: string= "http://localhost:3000/member/";

  constructor(private httpClient : HttpClient) { }

  public getMemberById(id){
    return this.httpClient.get(this.IdUrl+id);

  }

  public getAllMembers(){
    return this.httpClient.get(this.baseUrl);

  }

  public addMembers(obj){
    return this.httpClient.post(this.baseUrl,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data=>
     data));

  }



      


}