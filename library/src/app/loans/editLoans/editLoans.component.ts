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
    member_name: string;
    book_name: any;

    Books: any;
    Members: any;
    Loans: any;


      constructor( private toast: ToastrService,private route: ActivatedRoute, private LoansService: LoansService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){

        this.route.paramMap.subscribe(params => {
          this.loans_id = params.get('loans_id')
            this.return_status = params.get('return_status');
            this.loans_date = params.get('loans_date');
            this.member_name = params.get('first_name');
            this.book_name = params.get('book_name')
            console.log(this.book_name)
          })

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
          member_name: [''],
          book_name: ['']
          })
        }

        AddMember(){
          this.router.navigate(['/addMember'])
        }

        AddBook(){
          this.router.navigate(['/addBook'])
        }

        EditLoans(selectedItem: any){

          this.loans_id = this.registrationForm.value.loans_id,
          this.return_status = this.registrationForm.value.return_status,
          this.loans_date = this.registrationForm.value.loans_date,
          this.member_name = this.registrationForm.value.member_name,
          this.book_name = this.registrationForm.value.book_name,

            this.EditLoans= selectedItem.loans_id;
           return this.http.put("http://localhost:3000/loans/" + this.loans_id, selectedItem).subscribe(response => console.log(response))
          }

}
