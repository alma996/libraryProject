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
import { BookService } from '../book.service';


@Component({
  templateUrl: './editBook.component.html',
  styleUrls:['./editBook.component.css'],
})

export class EditBookComponent {

  faPlusCircle = faPlusCircle;

    registrationForm: FormGroup;
    book_id: any;
    author_name: string;
    genre_name: string;
    publisher_name: string;
    book_name: string;

    Genres: any;
    Authors: any;
    Publishers: any;

      constructor( private toast: ToastrService,private route: ActivatedRoute, private BookService: BookService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){

        this.route.paramMap.subscribe(params => {
            this.book_id = params.get('book_id');
            this.author_name = params.get('author_id');
            this.genre_name = params.get('genre_id');
            this.publisher_name = params.get('publisher_id')
            this.book_name = params.get('book_name')
          })

          this.BookService.getAllGenre().subscribe((reponse)=>{
            this.Genres=reponse;
      
          });
  
          this.BookService.getAllAuthor().subscribe((reponse)=>{
            this.Authors=reponse;
      
          });
  
          this.BookService.getAllPublisher().subscribe((reponse)=>{
            this.Publishers=reponse;
      
          })

        this.registrationForm = this.fb.group({
          book_id: [''],
          author_name: [''],
          genre_name: [''],
          publisher_name: [''],
          book_name: [''],
          })
        }

        EditBook(selectedItem: any){

          this.book_id = this.registrationForm.value.book_id,
          this.author_name = this.registrationForm.value.author_name,
          this.genre_name = this.registrationForm.value.genre_name,
          this.publisher_name = this.registrationForm.value.publisher_name,
          this.book_name = this.registrationForm.value.book_name,

            this.EditBook= selectedItem.book_id;
           return this.http.put("http://localhost:3000/book/" + this.book_id, selectedItem).subscribe(response => console.log(response))
          }

}
