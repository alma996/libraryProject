import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName, FormBuilder } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { DamageService } from './damage.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/compiler/src/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Router, ActivatedRoute } from '@angular/router';
import { all, allSettled } from 'q';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, isEmpty } from "rxjs/operators"; 
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.css']
})
export class DamageComponent implements OnInit{
  faTrash = faTrash;
  faUserEdit = faUserEdit;

  Damages: any;
  Delete: any;
  searchText: any;
  p: number = 1;
  loans_id: any;

  constructor(private fb: FormBuilder, private DamageService: DamageService,private route: ActivatedRoute, private router: Router, private http: HttpClient){
  }


  ngOnInit(){


  
    this.route.paramMap.subscribe(params => {
      this.loans_id = params.get('loans_id');
    })

  
    this.http.get("http://localhost:3000/damage/"+ this.loans_id).subscribe((response) =>{
      this.Damages=response;
  
    });
    
  }
  

    AddDamage(){
      this.router.navigate(['/addDamage/' + this.loans_id]);
    }

    DeleteDamage(selectedItem: any){
      this.Delete= selectedItem.damage_id;
     return this.http.delete("http://localhost:3000/damage/"+ this.Delete).subscribe(response => console.log(response)), location.reload()
    }

    EditDamage(selectedItem: any){
      this.router.navigate(['/editDamage/'+ selectedItem.damage_id +'/' + selectedItem.loans_id +'/' + selectedItem.damage_description]);
  
    }


    Back(){
      this.router.navigate(['/loans']);
    }
  




}
