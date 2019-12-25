import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable, from } from 'rxjs';
import { MembershipComponent } from './membership.component';


@Injectable({
  providedIn: 'root'
})


export class MembershipService {


  constructor(private httpClient : HttpClient) { 
  }

  baseUrl: string= "http://localhost:3000/membership/:id"

  public getAllMembership(obj){
    return this.httpClient.get(this.baseUrl, obj).pipe(map(data=>
     data));
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