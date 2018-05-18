import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { AlertPromise } from 'selenium-webdriver';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';


@Injectable()
export class AccountService {
  /*
    information.name = 'Ninjex'
    information.auth_token = '...'
  */

  public information = {
    loggedIn: false,
    username: undefined,
    id: undefined,
    group: 0, // by default make user regular user
    login_redirect: '/',
    login_after_redirect: true
  }

  constructor(
    private api: ApiService,
    private notification: NotificationService,
    private router: Router,
  ) { }

  register(username: String, password: String) {

    function register_cb (data) {
      if(data) {
        this.notification.add('Account Registered', data.response)
        this.router.navigateByUrl(this.information.login_redirect)
        if (this.information.login_after_redirect) this.login(username, password)
      }
    }

    if (!username) return this.notification.add('Invalid Fields', 'No username set');
    if (!password) return this.notification.add('Invalid Fields', 'No password set');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
      })
    }
    this.api.post('user', { username, password }, register_cb.bind(this), httpOptions)

  }

  login(username: String, password: String, cb: Function = undefined) {
    if (!username) return this.notification.add('Invalid Fields', 'No username set');
    if (!password) return this.notification.add('Invalid Fields', 'No password set');
    function setAuth (data) {
      console.log('In setAuth');
      this.api.addToken('auth_token', data.auth_token)
      console.log(this.api.getToken('auth_token'))
      if (this.api.tokens.auth_token) this.fetchInformation(username)
      else this.notification.add(`Login failed!`)
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
      })
    }
    this.api.post('user/login', { username, password }, setAuth.bind(this), httpOptions)
  }

  logout() {
    this.api.get('user/logout')
  }

  delete(username) {
    this.api.post('user/delete', { username })
  }

  fetchAccounts() {
    function showUsers(users) {
      console.log('Users: ', users)
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json'
      })
    }
    this.api.get('users', showUsers, httpOptions)
  }

  set (name, value) {
    this.information[name] = value
  }

  fetchInformation (user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.api.getToken('auth_token'),
        'RequestedBy': user
      })
    }
    this.api.get(`user/${user}`, this.setInformation.bind(this), httpOptions);
  }

  setInformation (data) {
    this.notification.add('Login Success', 'You are now logged in!')
    this.toggleLogin()
    console.log('In setInformation: ', data);
    this.information.id = data.id
    this.information.username = data.username
    this.information.group = data.user_group

    this.router.navigateByUrl(this.information.login_redirect)
    console.log('Account Info: ', this.information)
    
  }

  toggleLogin () {
    this.information.loggedIn ?
      this.set('loggedIn', false) :
      this.set('loggedIn', true)
  }
}
