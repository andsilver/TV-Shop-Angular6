import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<div id="app" class="h-100 app" [ngClass]="settings.theme" lazy-load-images>
               <router-outlet></router-outlet>
            </div>`
})
export class AppComponent implements OnInit, AfterViewInit {

  loading = false;
  public settings: Settings;

  constructor(
    public appSettings: AppSettings,
    public router: Router,
    @Inject(DOCUMENT) private doc: any) {}

  ngOnInit () {
    // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh
    this.settings = this.appSettings.settings;
    imgix.config.host = 'plattetv.imgix.net';
    imgix.config.srcAttribute = 'data-src';
    imgix.config.srcsetAttribute = 'data-srcset';
    imgix.config.sizesAttribute = 'data-sizes';

    this.setGoogleTagManager();
    this.setHotJarManager();
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  setGoogleTagManager() {
    const s = this.doc.createElement('script');
    s.type = 'text/javascript';
    s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer', '${environment.tagManagerId}');`;
    this.doc.getElementsByTagName('head')[0].appendChild(s);
  }

  setHotJarManager() {
    const hotjarScript = this.doc.createElement('script');
    hotjarScript.type = 'text/javascript';
    hotjarScript.innerHTML = `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${environment.hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`;
    this.doc.getElementsByTagName('head')[0].appendChild(hotjarScript);
  }
}
