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
import { faUserEdit, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { on } from 'cluster';
import { LoansService } from '../loans.service';

@Component({
  templateUrl: './addLoans.component.html',
  styleUrls:['./addLoans.component.css']
})
export class AddLoansComponent {

  faPlusCircle = faPlusCircle;
    registrationForm: FormGroup;
    Books: any;
    Members: any;
    Loans: any;
    

    get book_id(){
        return this.registrationForm.get('book_id')
      }

    
      get member_id(){
        return this.registrationForm.get('member_id')
      }


      get loans_date(){
        return this.registrationForm.get('loans_date')
      }

      get return_status(){
        return this.registrationForm.get('return_status')
      }
    
      constructor(private LoansService: LoansService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){

        this.registrationForm = this.fb.group({
            book_id: [''],
            member_id: [''],
            loans_date: [''],
            return_status: [''],
          })
          

        this.LoansService.getAllBook().subscribe((reponse)=>{
          this.Books=reponse;
    
        });

        this.LoansService.getAllMember().subscribe((reponse)=>{
          this.Members=reponse;
    
        })
        }
        AddLoans(loansdata){
          this.http.post("http://localhost:3000/loans/"+ this.registrationForm.value.member_id + '/' + this.registrationForm.value.book_id, loansdata).subscribe((response) =>
            console.log(response))
          }

          AddMember(){
            this.router.navigate(['/addMember']);
          }

          AddBook(){
            this.router.navigate(['/addBook']);
          }
    
}