import {Component, OnInit, OnDestroy, HostListener, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppSettings } from '../../app.settings';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as KeywordActions from 'app/store/actions/keyword.action';

import { AppService } from 'app/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  windowSize: string;
  widget: any;
  stores = [];
  categories = [];
  brands = [];

  subscriptions = [];

  constructor(
    public homeService: HomeService,
    private settings: AppSettings,
    private title: Title,
    private store: Store<State>,
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {

    this.title.setTitle(this.settings.settings.name);
    this.store.dispatch(new KeywordActions.SetKeyword(''));

    this.subscriptions = [
      forkJoin([
        this.homeService.getTopBanner(),
        this.homeService.getMiddleBanner(),
        this.homeService.getMostPopular(),
        this.appService.getStores()
      ]).subscribe(r => {
        this.widget = r;
        setTimeout(() => imgix.init(), 1);
        console.log(r);
        this.stores = r[3];
        console.log(this.stores);
      }),

      this.store.select(state => state.categories).subscribe(res => {
        this.categories = res.categories;
      }),

      this.store.select(state => state.brands).subscribe(res => {
        this.brands = res.manufacturer;
      })
    ];

    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  navigate(event) {
    console.log(event);
    const ele = event.target.parentElement;
    const link = ele.getAttribute('data-routerlink');
    console.log(ele, link);
    if (link) {
      this.router.navigate([link]);
    }
  }

}
