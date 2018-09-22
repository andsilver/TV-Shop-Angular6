import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
declare var imgix: any;

@Component({
  selector: 'app-root',
  template: `<div id="app" class="h-100 app" [ngClass]="settings.theme">
               <router-outlet></router-outlet>
            </div>`
})
export class AppComponent implements OnInit, AfterViewInit {
  loading = false;
  public settings: Settings;
  constructor(public appSettings: AppSettings, public router: Router) {
    this.settings = this.appSettings.settings;
    imgix.config.host = 'plattetv.imgix.net';
    imgix.config.srcAttribute = 'data-src';
    imgix.config.srcsetAttribute = 'data-srcset';
    imgix.config.sizesAttribute = 'data-sizes';
  }

  ngOnInit () {
   // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
      }
    });
  }
}
