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

  constructor(private fb: FormBuilder, private DamageService: DamageService,private route: ActivatedRoute, private router: Router, private http: HttpClient){
  }


  ngOnInit(){


  
    this.DamageService.getAllDamage().subscribe((reponse)=>{
      this.Damages=reponse;
console.log(this.Damages)
     });

    
  }
  

    AddDamage(){
      this.router.navigate(['/addDamge']);
    }

    DeleteDamage(selectedItem: any){
      this.Delete= selectedItem.damage_id;
     return this.http.delete("http://localhost:3000/damage/"+ this.Delete).subscribe(response => console.log(response)), location.reload()
    }

    EditDamage(selectedItem: any){
      this.router.navigate(['/editLoans/'+ selectedItem.loans_id +'/' + selectedItem.member_id +'/' + selectedItem.book_id +'/' + selectedItem.publisher_id +'/' + selectedItem.loans_date +'/' + selectedItem.return_status]);
  
    }
  




}
