import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  

  baseUrl: string= "http://localhost:3000/membership/:id";
  baseUrl2: string= "http://localhost:3000/membership/membership";

  constructor(private httpClient : HttpClient) { }



  public getAllMembership(){
    return this.httpClient.get(this.baseUrl2);

  }

  public addMembership(obj){
    return this.httpClient.post(this.baseUrl,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data=>
     data));

  }



      


}