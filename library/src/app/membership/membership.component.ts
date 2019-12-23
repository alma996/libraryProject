import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { MembershipService } from './membership.service';
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

@Component({
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit{
  faTrash = faTrash;
  faUserEdit = faUserEdit;

  Memberships: any;
  Delete: any;
  searchText: any;
  p: number = 1;


  constructor(private MembershipService: MembershipService, private router: Router, private http: HttpClient){
  }


  ngOnInit(){

      this.MembershipService.getAllMembership().subscribe((reponse)=>{
        console.log(reponse)
        this.Memberships=reponse
       });
      

  } 
  

  GetAllMemberships(){
    // User data which we have received from the registration form.
    this.MembershipService.getAllMembership().subscribe((reponse)=>{
      this.Memberships=reponse;
     });

    }

    AddMembership(selectedItem: any){
      this.router.navigate(['/addMembership/' + selectedItem.membership_id]);
    }

    DeleteMembership(selectedItem: any){
      this.Delete= selectedItem.membership_id;
     return this.http.delete("http://localhost:3000/membership/"+ this.Delete).subscribe(response => console.log(response)), location.reload()
    }

    EditMembership(selectedItem: any){
      this.router.navigate(['/editMembership/'+ selectedItem.membership_id +'/' + selectedItem.member_id +'/' + selectedItem.date_of_payment +'/' + selectedItem.year +'/' + selectedItem.amount]);
  
    }
  




}
