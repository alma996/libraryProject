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
import { faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { on } from 'cluster';
import {ToastrService} from 'ngx-toastr';
import { GenreService } from '../genre.service';
import {Location} from '@angular/common';
import {GenreModel} from '../GenreModel'


@Component({
  templateUrl: './editGenre.component.html',
  styleUrls:['./editGenre.component.css'],
})

export class EditGenreComponent {

    registrationForm: FormGroup;
    genre_id: any;
    genre_name: string;

      constructor( private toastr: ToastrService, private _location: Location, private route: ActivatedRoute, private GenreService: GenreService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){

        this.route.paramMap.subscribe(params => {
            this.genre_id = params.get('genre_id');
          })

          this.GenreService.getGenreById(this.genre_id).subscribe((reponse: GenreModel)=>{
            console.log(reponse);
            this.genre_name = reponse.genre_name
          });

        this.registrationForm = this.fb.group({
          genre_id: [''],
          genre_name: [''],
          })
        }

        EditGenre(selectedItem: true){

            this.genre_id = this.registrationForm.value.genre_id,
          this.genre_name = this.registrationForm.value.genre_name;

            if(this.registrationForm.value.genre_name !== ''){
           return this.http.put("http://localhost:3000/genre/" + this.genre_id, selectedItem).subscribe(response =>
           {this.showSuccess(response), this._location.back()}, error =>{this.errorSuccess()},);
            }else{
              this.errorSuccess()
            }
          }

          showSuccess(any){
            this.toastr.success('Genre' + ' ' + this.registrationForm.value.genre_name + ' ' + 'has been successfully edited', 'Successfully');
          }
        
          errorSuccess(){
            this.toastr.error('Genre not edited, please fill the required fields or try again', 'Error')
          }


}
