import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'
import {ToastrService} from 'ngx-toastr'

@Component({
    templateUrl:'./login.component.html'
  })
  export class LoginComponent {
    credentials: TokenPayload = {
      user_id: 0,
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  
    constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService) {}
  
    login() {
      this.auth.login(this.credentials).subscribe(
        () => {
          this.router.navigateByUrl('/'), this.showSuccess()
        },
        err => {
          console.error(err), this.errorSuccess()
        }
      )
    }

    showSuccess(){
      this.toastr.success('You are logged in', 'Successfully');
    }
  
    errorSuccess(){
      this.toastr.error('Please check your email or password', 'Error');
    }
  }