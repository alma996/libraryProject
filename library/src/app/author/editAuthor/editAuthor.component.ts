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
import { faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { on } from 'cluster';
import { AuthorService } from '../author.service';

@Component({
  templateUrl: './editAuthor.component.html',
})
export class EditAuthorComponent {

    registrationForm: FormGroup;
    author_id: any;
    first_name: string;
    last_name: string;

    

      constructor(private route: ActivatedRoute, AuthorService: AuthorService, private fb: FormBuilder, private router: Router, private http: HttpClient){
    }

    ngOnInit(){

        this.route.paramMap.subscribe(params => {
            this.author_id = params.get('author_id');
            this.first_name = params.get('last_name');
            this.last_name = params.get('first_name');
          })

        this.registrationForm = this.fb.group({
          author_id: [''],
          first_name: [''],
          last_name: [''],
          })
        }

        EditAuthor(selectedItem: any){

            this.author_id = this.registrationForm.value.author_id,
          this.first_name = this.registrationForm.value.first_name,
          this.last_name = this.registrationForm.value.last_name,
      
            console.log("Selected item Id: ", selectedItem.first_name);
            this.EditAuthor= selectedItem.author_id;
           return this.http.put("http://localhost:3000/author/" + this.author_id, selectedItem).subscribe(response => console.log(response));
          }

          Home(){
            this.router.navigate(['/author']);

          }

    
}