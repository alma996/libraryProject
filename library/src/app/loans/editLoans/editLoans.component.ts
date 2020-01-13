import { Component, OnInit, ViewContainerRef } from '@angular/core';
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
import { faUserEdit, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { on } from 'cluster';
import {ToastrService} from 'ngx-toastr';
import { LoansService } from '../loans.service';
import { LoansModel } from '../LoansModel'
import {Location} from '@angular/common';


@Component({
  templateUrl: './editLoans.component.html',
  styleUrls:['./editLoans.component.css'],
})

export class EditLoansComponent {

  faPlusCircle = faPlusCircle;

    registrationForm: FormGroup;
    loans_id: any;
    return_status: string;
    loans_date: any;
    member_id: string;
    member_name2: string;
    book_id: string;

    Books: any;
    Members: any;
    Loans: any;


      constructor( private toastr: ToastrService,private _location: Location, private route: ActivatedRoute, private LoansService: LoansService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){

        this.route.paramMap.subscribe(params => {
          this.loans_id = params.get('loans_id')
          this.book_id = params.get('book_id')
          this.member_id = params.get('member_id')
          })

          this.LoansService.getLoansById(this.loans_id,this.member_id,this.book_id).subscribe((response: LoansModel)=>{
            console.log(response);
            this.return_status = response.return_status
            this.loans_date = response.loans_date
          });

          this.LoansService.getAllBook().subscribe((reponse)=>{
            this.Books=reponse;
      
          });
  
          this.LoansService.getAllMember().subscribe((reponse)=>{
            this.Members=reponse;
      
          });

          this.LoansService.getAllLoans().subscribe((reponse)=>{
            this.Loans=reponse;
      
          });

        this.registrationForm = this.fb.group({
          loans_id: [''],
          return_status: [''],
          loans_date: [''],
          member_id: [''],
          member_name2: [''],
          book_id: [''],
          })
        }

        AddMember(){
          this.router.navigate(['/addMember'])
        }

        AddBook(){
          this.router.navigate(['/addBook'])
        }

        EditLoans(selectedItem: true){

          this.loans_id = this.registrationForm.value.loans_id,
          this.return_status = this.registrationForm.value.return_status,
          this.loans_date = this.registrationForm.value.loans_date,
          this.member_id = this.registrationForm.value.member_id,
          this.book_id = this.registrationForm.value.book_id,
          console.log(this.member_id)
          

          if(this.loans_date !== '0000-00-00' && this.loans_date !== null && this.return_status !== null && this.registrationForm.value.return_status !== 0){
           return this.http.put("http://localhost:3000/loans/" + this.loans_id, selectedItem).subscribe(response =>
           {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()},);
          }else{
            this.errorSuccess()
          }
        }

          showSuccess(any){
            this.toastr.success('Membership has been successfully edited', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Membership not edited, please fill the required fields or try again', 'Error')
          }

}
