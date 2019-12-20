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

  constructor(private httpClient : HttpClient) { }



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