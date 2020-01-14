import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class BookService {


  constructor(private httpClient : HttpClient) { 
  }

  baseUrl: string= "http://localhost:3000/book/:id"
  baseUrl2: string= "http://localhost:3000/book/book"
  IdUrl: string= "http://localhost:3000/book/"
  UrlGenre: string= "http://localhost:3000/genre/genre"
  UrlAuthor: string= "http://localhost:3000/author/author"
  UrlPublisher: string= "http://localhost:3000/publisher/publisher"


  public getBookById(id){
    return this.httpClient.get(this.IdUrl+id);

  }

  public getAllBook(){
    return this.httpClient.get(this.baseUrl2).pipe(map(data=>
     data));
  }

  public getAllGenre(){
    return this.httpClient.get(this.UrlGenre).pipe(map(data=>
     data));
  }

  public getAllAuthor(){
    return this.httpClient.get(this.UrlAuthor).pipe(map(data=>
     data));
  }

  public getAllPublisher(){
    return this.httpClient.get(this.UrlPublisher).pipe(map(data=>
     data));
  }

  public addBook(obj){
    return this.httpClient.post(this.baseUrl2,obj, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data=>
     data));

  }



      


}