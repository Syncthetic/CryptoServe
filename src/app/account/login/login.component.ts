import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginAttempts = 0
  constructor(
    public account: AccountService
  ) { }

  login (username, password) {
    console.log('Attempting login: ', username.value)
    // You can bind the this construct, or use ES6 arrow functions to allow this to be bound to the LoginComponent class
    // (d) => { this.auth = d.auth_token; this.toggleLogin() }
    this.account.login(username.value, password.value); //, setAuth.bind(this));
    this.loginAttempts++
  }

  ngOnInit() {
  }

}
