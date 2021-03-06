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
import { DamageService } from '../damage.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  templateUrl: './addDamage.component.html',
  styleUrls:['./addDamage.component.css']
})
export class AddDamageComponent {

    registrationForm: FormGroup;

    get damage_id(){
        return this.registrationForm.get('damage_id')
      }
loans_id: any;
    
      get damage_description(){
        return this.registrationForm.get('damage_description')
      }

    
      constructor(private DamageService: DamageService,private toastr:ToastrService, private _location: Location, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){

      this.route.paramMap.subscribe(params => {
        this.loans_id = params.get('loans_id');
      })

        this.registrationForm = this.fb.group({
            damage_id: [''],
            loans_id: [''],
            damage_description: [''],
          })
        }

        AddDamage(damagedata){
          if(this.registrationForm.value.damage_description !== ''){
          this.http.post("http://localhost:3000/damage/"+ this.loans_id, damagedata).subscribe((response) =>
          {this.showSuccess(response), this.router.navigate(['/damage/' + this.loans_id])}, error =>{this.errorSuccess()}, );
          }else{
            this.errorSuccess()
          }
          }


          showSuccess(any){
            this.toastr.success('Damage successfully added', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Please fill he required fields', 'Error');
          }
    
}