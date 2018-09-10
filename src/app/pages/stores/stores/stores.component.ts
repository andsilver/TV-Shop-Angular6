import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CrumbActions from 'app/store/actions/crumb-path.action';

import * as mock from './mock.json';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  data: any;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.data = mock['data'];
    this.store.dispatch(new CrumbActions.SaveCrumbPath([
      {
        name: 'Stores',
        permalink: `/stores`,
        static: true,
        default_title: true
      }
    ]));
  }

}
