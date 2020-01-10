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
import { MemberService } from '../member.service';
import { ToastrService } from 'ngx-toastr'
import {Location} from '@angular/common';

@Component({
  templateUrl: './addMember.component.html',
  styleUrls:['./addMember.component.css']
})
export class AddMemberComponent {

    registrationForm: FormGroup;

    get member_id(){
        return this.registrationForm.get('member_id')
      }
    
      get first_name(){
        return this.registrationForm.get('first_name')
      }

      get last_name(){
        return this.registrationForm.get('last_name')
      }

      get birth_date(){
        return this.registrationForm.get('birth_date')
      }

      get address(){
        return this.registrationForm.get('address')
      }

      get email(){
        return this.registrationForm.get('email')
      }

      get phone_number(){
        return this.registrationForm.get('phone_number')
      }
    
      constructor(private MemberService: MemberService, private fb: FormBuilder, private router: Router, private http: HttpClient, private toastr: ToastrService, private _location: Location){
    }

    ngOnInit(){
        this.registrationForm = this.fb.group({
            member_id: [''],
            first_name: [''],
            last_name: [''],
            birth_date: [''],
            address: [''],
            email: [''],
            phone_number: [''],
          })
        }

        AddMember(memberdata){
          if(this.registrationForm.value.first_name !== '' && this.registrationForm.value.last_name !== '' && this.registrationForm.value.birth_date !== '' && this.registrationForm.value.address !== '' && this.registrationForm.value.email !== '' && this.registrationForm.value.phone_number !== ''){
            this.MemberService.addMembers(memberdata).subscribe((response)=>
            {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()}, );
          }else{
            this.errorSuccess()
          }
          }

          showSuccess(any){
            this.toastr.success('Member' + ' ' + this.registrationForm.value.first_name + ' ' + this.registrationForm.value.last_name + ' ' + 'successfully added', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Please fill the required fields', 'Error');
          }
    
}