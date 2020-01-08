import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService, public toastr: ToastrService){}

  showSuccess(){
    this.toastr.success('Hello world', 'Toastr fun!');
  }

  errorSuccess(){
    this.toastr.error('Hello world', 'Error');
  }

  infoSuccess(){
    this.toastr.info('Hello world', 'Info!');
  }

  warningSuccess(){
    this.toastr.warning('Hello world', 'Warning!');
  }
}

