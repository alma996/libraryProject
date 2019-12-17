import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { AuthorService } from './author.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/compiler/src/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Router } from '@angular/router';
import { all, allSettled } from 'q';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  templateUrl: './author.component.html',
})
export class AuthorComponent implements OnInit{

  Authors: any;


  constructor(private AuthorService: AuthorService, private router: Router, private http: HttpClient){
  }


  ngOnInit(){

      this.AuthorService.getAllUsers().subscribe((reponse)=>{
        console.log(reponse)
        this.Authors=reponse;
        console.log("alma222", this.Authors)
       });
      

  } 
  

  GetAllUser(){
    // User data which we have received from the registration form.
    this.AuthorService.getAllUsers().subscribe((reponse)=>{
      console.log(reponse)
      this.Authors=reponse;
      console.log("alma222", this.Authors)
     });

    }
  




}
