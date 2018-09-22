import { Component, OnInit } from '@angular/core';
import * as mock from './mock.json';

@Component({
  selector: 'app-for-business',
  templateUrl: './for-business.component.html',
  styleUrls: ['./for-business.component.scss']
})
export class ForBusinessComponent implements OnInit {

  contacts = [];

  constructor() { }

  ngOnInit() {
    this.contacts = mock['data']['contacts'];
  }

}
