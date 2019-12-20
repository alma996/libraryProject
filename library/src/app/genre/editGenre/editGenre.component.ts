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


@Component({
  templateUrl: './editGenre.component.html',
  styleUrls:['./editGenre.component.css'],
})

export class EditGenreComponent {

    registrationForm: FormGroup;
    genre_id: any;
    genre_name: string;

      constructor( private toast: ToastrService,private route: ActivatedRoute, GenreService: GenreService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }
    

    ngOnInit(){

        this.route.paramMap.subscribe(params => {
            this.genre_id = params.get('genre_id');
            this.genre_name = params.get('genre_name');
          })

        this.registrationForm = this.fb.group({
          genre_id: [''],
          genre_name: [''],
          })
        }

        EditGenre(selectedItem: any){

            this.genre_id = this.registrationForm.value.genre_id,
          this.genre_name = this.registrationForm.value.genre_name,
      
            this.EditGenre= selectedItem.genre_id;
           return this.http.put("http://localhost:3000/genre/" + this.genre_id, selectedItem).subscribe(response => console.log(response)), location.pathname="./genre";
          }



          test() {
            this.toast.success("I'm a toast!", "Success!");
          }
}
