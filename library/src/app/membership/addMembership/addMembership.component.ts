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
import { MembershipService } from '../membership.service';

@Component({
  templateUrl: './addMembership.component.html',
  styleUrls:['./addMembership.component.css']
})
export class AddMembershipComponent {

    registrationForm: FormGroup;

    get membership_id(){
        return this.registrationForm.get('membership_id')
      }

      get member_id(){
        return this.registrationForm.get('member_id')
      }
    
      get date_of_payment(){
        return this.registrationForm.get('date_of_payment')
      }

      get year(){
        return this.registrationForm.get('year')
      }

      get amount(){
        return this.registrationForm.get('amount')
      }
    
      constructor(private MembershipService: MembershipService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){
        this.registrationForm = this.fb.group({
            membership_id: [''],
            member_id: [''],
            date_of_payment: [''],
            year: [''],
            amount: [''],
          })
        }

        AddMembership(membershipdata){
            this.MembershipService.addMembership(membershipdata).subscribe((reponse)=>{
              console.log(reponse), location.pathname="./membership"
             });
          }
    
}