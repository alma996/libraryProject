import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName, FormBuilder} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/compiler/src/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { all, allSettled } from 'q';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { on } from 'cluster';
import { PublisherService } from '../publisher.service'
import {Location} from '@angular/common';
import { PublisherModel } from '../PublisherModel'
import {ToastrService} from 'ngx-toastr';


@Component({
  templateUrl: './editPublisher.component.html',
  styleUrls:['./editPublisher.component.css'],
})

export class EditPublisherComponent {

    registrationForm: FormGroup;
    publisher_id: any;
    publisher_name: string;

      constructor(private route: ActivatedRoute, private toastr: ToastrService, private _location: Location,private PublisherService: PublisherService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){
        this.route.paramMap.subscribe(params => {
            this.publisher_id = params.get('publisher_id');
          })

          this.PublisherService.getPublisherById(this.publisher_id).subscribe((reponse: PublisherModel)=>{
            console.log(reponse);
            this.publisher_name = reponse.publisher_name
          });

        this.registrationForm = this.fb.group({
        publisher_id: [''],
          publisher_name: [''],
          })
        }

        EditPublisher(selectedItem: true){

            this.publisher_id = this.registrationForm.value.publisher_id,
            this.publisher_name = this.registrationForm.value.publisher_name;
      
          if(this.registrationForm.value.publisher_name !== ''){
           return this.http.put("http://localhost:3000/publisher/" + this.publisher_id, selectedItem).subscribe(response =>
           {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()},);
          }else{
            this.errorSuccess()
          }
          }

          showSuccess(any){
            this.toastr.success('Publisher' + ' ' + this.registrationForm.value.publisher_name + ' ' + 'has been successfully edited', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Publisher not edited, please fill the required fields or try again', 'Error')
          }

}
