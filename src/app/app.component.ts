import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  public settings: Settings;
  constructor(public appSettings:AppSettings, public router: Router){
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
   // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh    
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0,0);
      }
    })  
  }
}
