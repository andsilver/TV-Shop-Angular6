import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as mock from './mock.json';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CrumbActions from 'app/store/actions/crumb-path.action';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  data: any;

  constructor(private store: Store<State>, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data = mock['data'];
    this.route.params.subscribe(params => {
      console.log(params.id);
      this.store.dispatch(new CrumbActions.SaveCrumbPath([
        {
          name: 'Stores',
          permalink: `/stores`,
          static: true
        },
        {
          name: params.id,
          permalink: '',
          static: true
        }
      ]));
    });
  }

}
