import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public data

  constructor(private accountManager: AccountService) { }

  register(username, password) {
    // Grabbing username and password from input forms (register.component.html #user, #pass)
    // Must obtain the .value property, since it's from the input field.
    let user = username.value
    let pass = password.value
    this.data = this.accountManager.register(user, pass)
  }

  ngOnInit() {
  }

}
