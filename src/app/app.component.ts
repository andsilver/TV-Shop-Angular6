import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `<div id="app" class="h-100 app" [ngClass]="settings.theme">
               <router-outlet></router-outlet>
            </div>`
})
export class AppComponent implements OnInit, AfterViewInit {
  loading = false;
  public settings: Settings;
  constructor(public appSettings: AppSettings, public router: Router) {
    this.settings = this.appSettings.settings;
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
