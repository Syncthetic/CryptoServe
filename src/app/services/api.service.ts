import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {

  private baseURL = 'https://justinbess.com/api/'
  private tokens = {}

  public lastResponse
  
  constructor(private http: HttpClient) { }

  post(url: String, data: {}, cb: Function = undefined, headers = {}) {
    let request_url = this.baseURL + url;
    this.http.post(request_url, data, headers)
    .subscribe((data) => {
      console.log('Data: ', data)
      this.lastResponse = data
      if( cb !== undefined) cb(data)
    }, (err) => {
      console.log('Error: ', err.error)
      this.lastResponse = err
      if( cb !== undefined) cb(data)
    })
  }

  get(url: String, cb: Function = undefined, headers = {}) {
    let request_url = this.baseURL + url;
    this.http.get(request_url, headers)
    .subscribe((data) => {
      console.log('Data: ', data)
      this.lastResponse = data
      if( cb !== undefined) cb(data)
    }, (err) =>  {
      console.log('Error: ', err.error)
      this.lastResponse = err.error
      if( cb !== undefined) cb(err)
    })
  }

  getToken(tokenName) {
    return this.tokens[tokenName]
  }

  addToken(name, value) {
    this.tokens[name] = value
  }

  gatherTokens() {
    let list = []
    for(let token in this.tokens) {
      let token_name = token
      let token_value = this.tokens[token]
      list.push({name: token_name, value: token_value})
    }
    return list;
  }
}