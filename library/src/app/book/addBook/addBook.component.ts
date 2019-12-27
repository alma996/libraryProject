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
import { BookService } from '../book.service';

@Component({
  templateUrl: './addBook.component.html',
  styleUrls:['./addBook.component.css']
})
export class AddBookComponent {

  faPlusCircle = faPlusCircle;
    registrationForm: FormGroup;
    Books: any;
    Genres: any;
    Authors: any;
    Publishers: any;

    get book_name(){
        return this.registrationForm.get('book_name')
      }

    
      get author_id(){
        return this.registrationForm.get('author_id')
      }

      get genre_id(){
        return this.registrationForm.get('genre_id')
      }

      get publisher_id(){
        return this.registrationForm.get('publisher_id')
      }
    
      constructor(private BookService: BookService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){

        this.registrationForm = this.fb.group({
            book_name: [''],
            author_id: [''],
            genre_id: [''],
            publisher_id: [''],
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
        }
        AddBook(membershipdata){
          console.log(this.registrationForm.value.author_id.value)
          this.http.post("http://localhost:3000/book/"+ this.registrationForm.value.author_id + '/' + this.registrationForm.value.genre_id + '/' + this.registrationForm.value.publisher_id, membershipdata).subscribe((response) =>
            console.log(response))
          }

          AddGenre(){
            this.router.navigate(['/addGenre']);
          }

          AddAuthor(){
            this.router.navigate(['/addAuthor']);
          }

          AddPublisher(){
            this.router.navigate(['/addPublisher']);
          }
    
}