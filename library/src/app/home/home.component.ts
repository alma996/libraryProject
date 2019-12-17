import { Component } from '@angular/core'

@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent{
    getUrl()
{
  return "url('assets/img/sl1.jpeg')";
}
}