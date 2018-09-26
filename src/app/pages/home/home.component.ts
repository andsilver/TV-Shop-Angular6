import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { AppSettings } from '../../app.settings';
import { Title } from '@angular/platform-browser';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as KeywordActions from 'app/store/actions/keyword.action';

declare var imgix: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  slides = [
    {
      title: 'Welkom in onze vernieuwde webwinkel!',
      subtitle: 'Nu nog meer bestelgemak',
      image: `//${imgix.config.host}/images/carousel/banner1.jpg?auto=compress&w=657`
    },
    {
      title: 'Black Friday Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner2.jpg?auto=compress&w=657`
    },
    {
      title: 'Kerst Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner3.jpg?auto=compress&w=657`
    },
    {
      title: 'Zomer Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner4.jpg?auto=compress&w=657`
    },
    {
      title: 'Mega Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner5.jpg?auto=compress&w=657`
    }
  ];

  windowSize: string;


  constructor(public appService: AppService, private settings: AppSettings, private title: Title, private store: Store<State>) { }

  ngOnInit() {

    this.title.setTitle(this.settings.settings.name);
    this.store.dispatch(new KeywordActions.SetKeyword(''));

    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  ngOnDestroy() {
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

}
