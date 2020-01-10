import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupName, FormBuilder} from '@angular/forms';
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
import { on } from 'cluster';
import { GenreService } from '../genre.service';
import { ToastrService } from 'ngx-toastr'
import {Location} from '@angular/common';

@Component({
  templateUrl: './addGenre.component.html',
  styleUrls:['./addGenre.component.css']
})
export class AddGenreComponent {

    registrationForm: FormGroup;

    get genre_id(){
        return this.registrationForm.get('genre_id')
      }
    
      get genre_name(){
        return this.registrationForm.get('genre_name')
      }
    
      constructor(private GenreService: GenreService,private toastr: ToastrService, private _location: Location, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){
        this.registrationForm = this.fb.group({
          genre_id: [''],
          genre_name: [''],
          })
        }

        AddGenre(genredata){
          if(this.registrationForm.value.genre_name !== ''){
            this.GenreService.addGenres(genredata).subscribe((response)=>
            {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()}, );

            }else{
              this.errorSuccess()
            }
          }

          showSuccess(any){
            this.toastr.success('Genre' + ' ' + this.registrationForm.value.genre_name + ' ' + 'successfully added', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Please fill the required fields', 'Error');
          }
    
}