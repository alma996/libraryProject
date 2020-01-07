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
import { DamageService } from '../damage.service';
import {Location} from '@angular/common';


@Component({
  templateUrl: './editDamage.component.html',
  styleUrls:['./editDamage.component.css'],
})

export class EditDamageComponent {

    registrationForm: FormGroup;
    damage_id: any;
    loans_id: any;
    damage_description: any;

      constructor(private route: ActivatedRoute, private _location: Location, DamageService: DamageService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){
        this.route.paramMap.subscribe(params => {
            this.damage_id = params.get('damage_id');
            this.loans_id = params.get('loans_id');
            this.damage_description = params.get('damage_description');
          })

        this.registrationForm = this.fb.group({
        damage_id: [''],
          loans_id: [''],
          damage_description: [''],
          })
        }

        EditDamage(selectedItem: any){

            this.damage_id = this.registrationForm.value.damage_id,
            this.loans_id = this.registrationForm.value.loans_id,
          this.damage_description = this.registrationForm.value.damage_description,
      
            this.EditDamage= selectedItem.damage_id;
           return this.http.put("http://localhost:3000/damage/" + this.damage_id, selectedItem).subscribe(response => console.log(response)), this._location.back();
          }


}
