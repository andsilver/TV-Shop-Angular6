import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'app/app.service';
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
  subscriptions = [];
  _store: any;

  sidenavOpen = true;

  constructor(private store: Store<State>, private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    this.data = mock['data'];
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

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

}
