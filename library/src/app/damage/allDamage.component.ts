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
import { faUserEdit, faSearch} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr'

@Component({
  templateUrl: './allDamage.component.html',
  styleUrls: ['./damage.component.css']
})
export class AllDamageComponent implements OnInit{
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch

  Damages: any;
  Delete: any;
  searchText: any;
  p: number = 1;
  loans_id: any;

  constructor(private fb: FormBuilder,private toastr: ToastrService, private DamageService: DamageService,private route: ActivatedRoute, private router: Router, private http: HttpClient){
  }


  ngOnInit(){


  
    this.route.paramMap.subscribe(params => {
      this.loans_id = params.get('loans_id');
    })

  
    this.DamageService.getAllDamage().subscribe((response) =>{
      this.Damages=response;
  
    });
    
  }
  
  GetAllDamages(){
    
    this.http.get("http://localhost:3000/damage").subscribe((response) =>{
      this.Damages=response;
  
    });
  }

    AddDamage(){
      this.router.navigate(['/addDamage/' + this.loans_id]);
    }

    DeleteDamage(selectedItem: any){
      this.Delete= selectedItem.damage_id;
     return this.http.delete("http://localhost:3000/damage/"+ this.Delete).subscribe(response =>
     {console.log(response),this.GetAllDamages(), this.showSuccess()},
      error =>{this.errorSuccess()}, );
    }

    EditDamage(selectedItem: any){
      this.router.navigate(['/editDamage/'+ selectedItem.damage_id+ '/' + selectedItem.loans_id]);
  
    }


    Back(){
      this.router.navigate(['/loans']);
    }

    showSuccess(){
      this.toastr.success('Damage successfully deleted', 'Successfully');
    }
  
    errorSuccess(){
      this.toastr.error('Damage has not been deleted', 'Error');
    }
  




}
