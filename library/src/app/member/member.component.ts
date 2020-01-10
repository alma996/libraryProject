import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { MemberService } from './member.service';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/compiler/src/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Router } from '@angular/router';
import { all, allSettled } from 'q';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { faTrash} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit, faSearch} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr'

@Component({
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch;

  Members: any;
  Delete: any;
  Memberships: any ;
  searchText: any;
  p: number = 1;


  constructor(private MemberService: MemberService, private router: Router, private http: HttpClient, private toastr: ToastrService){
  }


  ngOnInit(){

      this.MemberService.getAllMembers().subscribe((reponse)=>{
        console.log(reponse)
        this.Members=reponse;
       });
      

  } 
  

  GetAllMembers(){
    // User data which we have received from the registration form.
    this.MemberService.getAllMembers().subscribe((reponse)=>{
      this.Members=reponse;
     });

    }

    AddMember(){
      this.router.navigate(['/addMember']);
    }

    DeleteMember(selectedItem: any){
      this.Delete= selectedItem.member_id;
     return this.http.delete("http://localhost:3000/member/"+ this.Delete).subscribe(response =>
     {console.log(response),this.GetAllMembers(), this.showSuccess()},
     error =>{this.errorSuccess()}, );
    }

    EditMember(selectedItem: any){
      this.router.navigate(['/editMember/'+ selectedItem.member_id]);
  
    }

    Membership(selectedItem: any){
    
      this.router.navigate(['/membership/'+ selectedItem.member_id]);

    }

    showSuccess(){
      this.toastr.success('Member successfully deleted', 'Successfully');
    }
  
    errorSuccess(){
      this.toastr.error('Member has not been deleted', 'Error');
    }
  




}
