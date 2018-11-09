import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';

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
  subscriptions = [];
  _store: any;
  windowSize: string;

  coordinates = {
    'Amsterdam': {
      lat: 52.336312,
      lng: 4.922284
    },
    'Arnhem': {
      lat: 51.983547,
      lng: 5.912433
    },
    'Breda': {
      lat: 51.582697,
      lng: 4.744272
    },
    'Doesburg': {
      lat: 52.014428,
      lng: 6.136200
    },
    'Doetinchem': {
      lat: 51.945061,
      lng: 6.276870
    },
    'Eindhoven': {
      lat: 51.500545,
      lng: 5.473087
    },
    'Nijmegen': {
      lat: 51.844942,
      lng: 5.862158
    },
    'Utrecht': {
      lat: 52.062445,
      lng: 5.106278
    }
  };

  sidenavOpen = true;

  constructor(private store: Store<State>, private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.params
        .subscribe(params => {
          // console.log(params.id);
          this.appService.getStoreByName(params.id)
            .subscribe(res => {
              this._store = res[0];
              console.log(this._store);
              this.store.dispatch(new CrumbActions.SaveCrumbPath([
                {
                  name: 'Stores',
                  permalink: `/stores`,
                  static: true
                },
                {
                  name: this._store.store_location,
                  permalink: '',
                  static: true
                }
              ]));
              setTimeout(() => imgix.init(), 1);
            });
        })
    );

    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

}
