import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DamageService {


  constructor(private httpClient : HttpClient) { 
  }

  baseUrl: string= "http://localhost:3000/book/:id"
  baseUrl2: string= "http://localhost:3000/book/book"
  UrlDamage: string= "http://localhost:3000/damage"
  UrlAuthor: string= "http://localhost:3000/author/author"
  UrlMember: string= "http://localhost:3000/member/member"
  IdUrl: string= "http://localhost:3000/damage/"
  public getAllBook(){
    return this.httpClient.get(this.baseUrl2).pipe(map(data=>
     data));
  }

  public getDamageById(id, id1){
    return this.httpClient.get(this.IdUrl+id+'/'+id1);

  }

  public getAllDamage(){
    return this.httpClient.get(this.UrlDamage).pipe(map(data=>
     data));
  }

  public getAllAuthor(){
    return this.httpClient.get(this.UrlAuthor).pipe(map(data=>
     data));
  }

  public getAllMember(){
    return this.httpClient.get(this.UrlMember).pipe(map(data=>
     data));
  }

  public addDamage(obj){
    return this.httpClient.post(this.UrlDamage,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data=>
     data));

  }



      


}