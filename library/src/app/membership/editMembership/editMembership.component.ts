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
import { MembershipService } from '../membership.service'
import { MembershipModel } from '../MembershipModel'
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';


@Component({
  templateUrl: './editMembership.component.html',
  styleUrls:['./editMembership.component.css'],
})

export class EditMembershipComponent {

    registrationForm: FormGroup;
    membership_id: any;
    member_id: any;
    date_of_payment: any;
    year: any;
    amount: any;

      constructor(private route: ActivatedRoute, private MembershipService: MembershipService, private toastr: ToastrService, private _location: Location, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){
        this.route.paramMap.subscribe(params => {
            this.membership_id = params.get('membership_id');
            this.member_id = params.get('member_id');
          })

          this.MembershipService.getMembershipById(this.membership_id, this.member_id).subscribe((response: MembershipModel)=>{
            console.log(response);
            this.date_of_payment = response.date_of_payment
            this.year = response.year
            this.amount = response.amount
          });

        this.registrationForm = this.fb.group({
        membership_id: [''],
          member_id: [''],
          date_of_payment: [''],
          year: [''],
          amount: [''],
          })
        }

        EditMembership(selectedItem: true){

            this.membership_id = this.registrationForm.value.membership_id,
            this.member_id = this.registrationForm.value.member_id,
          this.date_of_payment = this.registrationForm.value.date_of_payment,
          this.year = this.registrationForm.value.year,
          this.amount = this.registrationForm.value.amount;
      
          if(this.date_of_payment !== '0000-00-00' && this.date_of_payment !== null && this.year !== null && this.year !== 0 && this.amount !== 0 && this.amount !== null){
           return this.http.put("http://localhost:3000/membership/" + this.membership_id, selectedItem).subscribe(response =>
           {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()},);
          }else{
            this.errorSuccess()
          }
          }

          
          showSuccess(any){
            this.toastr.success('Membership has been successfully edited', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Membership not edited, please fill the required fields or try again', 'Error')
          }

}
