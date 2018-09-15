import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from 'app/app.service';

import { Store } from '@ngrx/store';
import { State } from 'app/store';

import * as data from './mock.json';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.scss']
})
export class FiltersListComponent implements OnInit, OnDestroy {

  categories = [];

  filter: any;
  brands = [];
  popoverFilter: any;

  subscriptions = [];

  constructor(private appService: AppService, private store: Store<State>) { }

  ngOnInit() {
    this.subscriptions = [
      this.appService.getBrands(20).subscribe(res => this.brands = res.manufacturer),
      this.store.select(state => state.categories).subscribe(res => this.categories = res.categories.filter(c => c.parentId === 0))
    ];
    this.filter = data['filter'];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
