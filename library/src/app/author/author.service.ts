import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { getLocaleDateFormat } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  

  baseUrl: string= "http://localhost:3000/author/author";

  constructor(private httpClient : HttpClient) { }



  public getAllUsers(){
    return this.httpClient.get(this.baseUrl);

  }



      


}