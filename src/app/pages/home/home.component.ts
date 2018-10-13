import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AppSettings } from '../../app.settings';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as KeywordActions from 'app/store/actions/keyword.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  windowSize: string;
  widget: any;

  constructor(
    public homeService: HomeService,
    private settings: AppSettings,
    private title: Title,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {

    this.title.setTitle(this.settings.settings.name);
    this.store.dispatch(new KeywordActions.SetKeyword(''));

    forkJoin([
      this.homeService.getTopBanner(),
      this.homeService.getMiddleBanner(),
      this.homeService.getMostPopular()
    ]).subscribe(r => {
      this.widget = r;
      setTimeout(() => imgix.init(), 1);
      console.log(r);
    });

    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  ngOnDestroy() {
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  navigate(event) {
    console.log(event);
    const ele = event.target;
    const link = ele.getAttribute('data-routerlink');
    console.log(ele, link);
    if (link) {
      this.router.navigate([link]);
    }
  }

}
