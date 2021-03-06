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
import { PublisherService } from '../publisher.service';
import { ToastrService } from 'ngx-toastr'
import {Location} from '@angular/common';

@Component({
  templateUrl: './addPublisher.component.html',
  styleUrls:['./addPublisher.component.css']
})
export class AddPublisherComponent {

    registrationForm: FormGroup;

    get publisher_id(){
        return this.registrationForm.get('publisher_id')
      }

      get publisher_name(){
        return this.registrationForm.get('publisher_name')
      }

      constructor(private PublisherService: PublisherService,private toastr: ToastrService, private _location: Location, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){
        this.registrationForm = this.fb.group({
            publisher_id: [''],
            publisher_name: [''],
          })
        }

        AddPublisher(publisherdata){
          if(this.registrationForm.value.publisher_name !== ''){
            this.PublisherService.addPublisher(publisherdata).subscribe((response)=>
            {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()}, );
            }else{
              this.errorSuccess()
            }
          }

          showSuccess(any){
            this.toastr.success('Publisher' + ' ' + this.registrationForm.value.publisher_name + ' ' + 'successfully added', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Please fill the required fields', 'Error');
          }
    
}
