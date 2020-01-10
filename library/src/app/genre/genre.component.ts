import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName } from '@angular/forms';
//import { RegistrationService } from './registration.service';
import { GenreService } from './genre.service';
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
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit{
  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faSearch = faSearch

  Genres: any;
  Delete: any;
  searchText: any;
  p: number = 1;


  constructor(private GenreService: GenreService, private router: Router, private toastr: ToastrService, private http: HttpClient){
  }


  ngOnInit(){

      this.GenreService.getAllGenres().subscribe((reponse)=>{
        console.log(reponse)
        this.Genres=reponse;
       });
      

  } 
  

  GetAllGenres(){
    // User data which we have received from the registration form.
    this.GenreService.getAllGenres().subscribe((reponse)=>{
      this.Genres=reponse;
     });

    }

    AddGenre(){
      this.router.navigate(['/addGenre']);
    }

    DeleteGenre(selectedItem: any){
      this.Delete= selectedItem.genre_id;
     return this.http.delete("http://localhost:3000/genre/"+ this.Delete).subscribe(response =>
     {console.log(response),this.GetAllGenres(), this.showSuccess()},
     error =>{this.errorSuccess()}, );
    }

    EditGenre(selectedItem: any){
      this.router.navigate(['/editGenre/'+ selectedItem.genre_id]);
  
    }

    showSuccess(){
      this.toastr.success('Genre successfully deleted', 'Successfully');
    }
  
    errorSuccess(){
      this.toastr.error('Genre has not been deleted', 'Error');
    }
  




}
