import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName, FormBuilder } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { LoansService } from './loans.service';
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
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit{
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch

  Loans: any;
  Delete: any;
  searchText: any;
  p: number = 1;

  constructor(private fb: FormBuilder,private toastr: ToastrService, private LoansService: LoansService,private route: ActivatedRoute, private router: Router, private http: HttpClient){
  }


  ngOnInit(){


  
    this.LoansService.getAllLoans().subscribe((reponse)=>{
      this.Loans=reponse;

     });

    
  }
  
    GetAllLoans(){
      this.LoansService.getAllLoans().subscribe((reponse)=>{
        this.Loans=reponse;
    });
  }

    AddLoans(){
      this.router.navigate(['/addLoans']);
    }

    DeleteLoans(selectedItem: any){
      this.Delete= selectedItem.loans_id;
     return this.http.delete("http://localhost:3000/loans/"+ this.Delete).subscribe(response =>
     {console.log(response),this.GetAllLoans(), this.showSuccess()},
     error =>{this.errorSuccess()}, );
    }

    EditLoans(selectedItem: any){
      this.router.navigate(['/editLoans/'+ selectedItem.loans_id +'/' + selectedItem.member_id + '/' + selectedItem.book_id]);
    }
  

    Damage(selectedItem: any){
    
      this.router.navigate(['/damage/'+ selectedItem.loans_id]);

    }

    showSuccess(){
      this.toastr.success('Loans successfully deleted', 'Successfully');
    }
  
    errorSuccess(){
      this.toastr.error('Loans has not been deleted', 'Error');
    }


}
