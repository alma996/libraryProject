import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  
  baseUrl: string= "http://localhost:3000/publisher/publisher";
  IdUrl: string= "http://localhost:3000/publisher/";

  constructor(private httpClient : HttpClient) { }

  public getPublisherById(id){
    return this.httpClient.get(this.IdUrl+id);

  }

  public getAllPublisher(){
    return this.httpClient.get(this.baseUrl);

  }

  public addPublisher(obj){
    return this.httpClient.post(this.baseUrl,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data=>
     data));

  }



      


}