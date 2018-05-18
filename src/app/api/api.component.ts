import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  public tokenList = this.api.gatherTokens()
  
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

}
