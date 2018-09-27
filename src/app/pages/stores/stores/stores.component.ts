import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AppService } from 'app/app.service';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CrumbActions from 'app/store/actions/crumb-path.action';

import * as mock from './mock.json';
declare var imgix: any;
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit, OnDestroy {

  data: any;
  subscriptions = [];
  stores = [];
  sidenavOpen = true;

  constructor(private store: Store<State>, private appService: AppService) { }

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

    this.subscriptions.push(
      this.appService.getStores().subscribe(res => {
        console.log(res);
        this.stores = res;
        setTimeout(() => imgix.init(), 1);
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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
