import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  credentials: TokenPayload = {
    user_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/profile");
      },
      err => {
        console.error(err);
      }
    );
  }
}