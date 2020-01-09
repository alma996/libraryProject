import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName, FormBuilder} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/compiler/src/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Router, ActivatedRoute } from '@angular/router';
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
  templateUrl: './editAuthor.component.html',
  styleUrls:['./editAuthor.component.css']
})
export class EditAuthorComponent {

    registrationForm: FormGroup;
    author_id: any;
    first_name: string;
    last_name: string;

    

      constructor(private route: ActivatedRoute,private _location: Location, private toastr: ToastrService, AuthorService: AuthorService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){

        this.route.paramMap.subscribe(params => {
            this.author_id = params.get('author_id');
            this.first_name = params.get('first_name');
            this.last_name = params.get('last_name');
          })

        this.registrationForm = this.fb.group({
          author_id: [''],
          first_name: [''],
          last_name: [''],
          })
        }

        EditAuthor(selectedItem: any){

            this.author_id = this.registrationForm.value.author_id,
          this.first_name = this.registrationForm.value.first_name,
          this.last_name = this.registrationForm.value.last_name,
      

            this.EditAuthor= selectedItem.author_id;
           return this.http.put("http://localhost:3000/author/" + this.author_id, selectedItem).subscribe(response =>
           {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()},);
          }


          showSuccess(any){
            this.toastr.success('Author' + ' ' + this.registrationForm.value.first_name + ' ' + this.registrationForm.value.last_name + ' ' + 'has been successfully edited', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Author not edited, please try again', 'Error')
          }

    
}