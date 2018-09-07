import { Component, OnInit } from '@angular/core';
import * as mock from './mock.json';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  data: any;

  constructor() { }

  ngOnInit() {
    this.data = mock['data'];
  }

}
