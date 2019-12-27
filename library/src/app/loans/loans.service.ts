import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LoansService {


  constructor(private httpClient : HttpClient) { 
  }

  baseUrl: string= "http://localhost:3000/book/:id"
  baseUrl2: string= "http://localhost:3000/book/book"
  UrlLoans: string= "http://localhost:3000/loans/loans"
  UrlAuthor: string= "http://localhost:3000/author/author"
  UrlMember: string= "http://localhost:3000/member/member"
  public getAllBook(){
    return this.httpClient.get(this.baseUrl2).pipe(map(data=>
     data));
  }

  public getAllLoans(){
    return this.httpClient.get(this.UrlLoans).pipe(map(data=>
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

  public addLoans(obj){
    return this.httpClient.post(this.UrlLoans,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data=>
     data));

  }



      


}