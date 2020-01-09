import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName, FormBuilder} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/compiler/src/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Router } from '@angular/router';
import { all, allSettled } from 'q';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { on } from 'cluster';
import { AuthorService } from '../author.service';
import { ToastrService } from 'ngx-toastr'
import {Location} from '@angular/common';

@Component({
  templateUrl: './addAuthor.component.html',
  styleUrls:['./addAuthor.component.css']
})
export class AddAuthorComponent {

    registrationForm: FormGroup;

    get author_id(){
        return this.registrationForm.get('author_id')
      }
    
      get first_name(){
        return this.registrationForm.get('first_name')
      }
    
      get last_name(){
        return this.registrationForm.get('last_name')
      }

      constructor(private AuthorService: AuthorService, private fb: FormBuilder, private _location: Location, private toastr: ToastrService, private router: Router, private http: HttpClient){
    }

    ngOnInit(){
        this.registrationForm = this.fb.group({
          author_id: [''],
          first_name: [''],
          last_name: [''],
          })
        }

        AddAuthor(authordata){
          if(this.registrationForm.value.first_name !== '', this.registrationForm.value.last_name !== ''){
            this.AuthorService.addAuthors(authordata).subscribe((response)=>
            {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()}, );
          }else{
            this.errorSuccess();
          }
          }

          showSuccess(any){
            this.toastr.success('Author' + ' ' + this.registrationForm.value.first_name + ' ' + this.registrationForm.value.last_name + ' ' + 'successfully added', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Please fill the required fields', 'Error');
          }
    
}