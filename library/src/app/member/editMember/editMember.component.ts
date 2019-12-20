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
import { MemberService } from '../member.service'


@Component({
  templateUrl: './editMember.component.html',
  styleUrls:['./editMember.component.css'],
})

export class EditMemberComponent {

    registrationForm: FormGroup;
    member_id: any;
    first_name: string;
    last_name: string;
    birth_date: any;
    address: string;
    email: string;
    phone_number: any;

      constructor(private route: ActivatedRoute, MemberService: MemberService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){
        this.route.paramMap.subscribe(params => {
            this.member_id = params.get('member_id');
            this.first_name = params.get('first_name');
            this.last_name = params.get('last_name');
            this.birth_date= params.get('birth_date');
            this.address = params.get('address');
            this.email = params.get('email');
            this.phone_number = params.get('phone_number');
          })

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

        EditMember(selectedItem: any){

            this.member_id = this.registrationForm.value.member_id,
          this.first_name = this.registrationForm.value.first_name,
          this.last_name = this.registrationForm.value.last_name,
          this.birth_date = this.registrationForm.value.birth_date,
          this.address = this.registrationForm.value.address,
          this.email = this.registrationForm.value.email,
          this.phone_number = this.registrationForm.value.phone_number,
      
            this.EditMember= selectedItem.member_id;
           return this.http.put("http://localhost:3000/member/" + this.member_id, selectedItem).subscribe(response => console.log(response)), location.pathname="./member";
          }

}
