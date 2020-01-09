import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { AuthorService } from './author.service';
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
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr'

@Component({
  templateUrl: './author.component.html',
  styleUrls:['./author.component.css']
})
export class AuthorComponent implements OnInit{
  faTrash = faTrash;
  faSearch = faSearch
  faUserEdit = faUserEdit;

  Authors: any;
  Delete: any;
  searchText: any;
  p: number = 1;


  constructor(private AuthorService: AuthorService, private router: Router, private http: HttpClient, private toastr: ToastrService){
  }


  ngOnInit(){

      this.AuthorService.getAllUsers().subscribe((reponse)=>{
        console.log(reponse)
        this.Authors=reponse;
        console.log("alma222", this.Authors)
       });
      

  } 
  

  GetAllUser(){
    // User data which we have received from the registration form.
    this.AuthorService.getAllUsers().subscribe((reponse)=>{
      console.log(reponse)
      this.Authors=reponse;
      console.log("alma222", this.Authors)
     });

    }

    AddAuthor(){
      this.router.navigate(['/addAuthor']);
    }

    DeleteAuthor(selectedItem: any){
      console.log("Selected item Id: ", selectedItem.author_id);
      this.Delete= selectedItem.author_id;
     return this.http.delete("http://localhost:3000/author/"+ this.Delete).subscribe(response =>
     {console.log(response),location.reload(),30000, this.showSuccess()},
     error =>{this.errorSuccess()}, );
    }

    EditAuthor(selectedItem: any){
      this.router.navigate(['/editAuthor/'+ selectedItem.author_id +'/' + selectedItem.first_name +'/' + selectedItem.last_name]);
      console.log("Selected item id: ", selectedItem.author_id, selectedItem.first_name, selectedItem.last_name);
      //this.Update= selectedItem.EmpID;
     //return this.http.put("http://localhost:3000/employees/" + this.Update, this.Update).subscribe(response => console.log(response));
  
    }

    showSuccess(){
      this.toastr.success('Author successfully deleted', 'Successfully');
    }
  
    errorSuccess(){
      this.toastr.error('Author has not been deleted', 'Error');
    }
  




}
