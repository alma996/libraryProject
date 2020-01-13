import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName, FormBuilder } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { BookService } from './book.service';
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
import { faSearch} from '@fortawesome/free-solid-svg-icons';
import { faBookMedical } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr'


@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch;
  faBookMedical = faBookMedical

  Books: any;
  Delete: any;
  searchText: any;
  p: number = 1;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private BookService: BookService,private route: ActivatedRoute, private router: Router, private http: HttpClient){
  }


  ngOnInit(){
  
    this.BookService.getAllBook().subscribe((reponse)=>{
      this.Books=reponse;

     });

    
  }

  GetAllBooks(){
    this.BookService.getAllBook().subscribe((reponse)=>{
      this.Books=reponse;

     });
  }
  

    AddBook(){
      this.router.navigate(['/addBook']);
    }

    DeleteBook(selectedItem: any){
      this.Delete= selectedItem.book_id;
     return this.http.delete("http://localhost:3000/book/"+ this.Delete).subscribe(response =>
     {console.log(response),this.GetAllBooks(), this.showSuccess()},
      error =>{this.errorSuccess()}, );
    
    }

    EditBook(selectedItem: any){
      this.router.navigate(['/editBook/'+ selectedItem.book_id +'/' + selectedItem.genre.genre_name +'/' + selectedItem.author.first_name + ' ' + selectedItem.author.last_name +'/' + selectedItem.publisher.publisher_name +'/' + selectedItem.book_name]);
  
    }
  
    showSuccess(){
      this.toastr.success('Book successfully deleted', 'Successfully');
    }
  
    errorSuccess(){
      this.toastr.error('The book has not been deleted', 'Error');
    }



}
