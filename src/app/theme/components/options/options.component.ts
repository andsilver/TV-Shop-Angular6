import { Component } from '@angular/core';
import { Settings, AppSettings } from '../../../app.settings';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  public showOptions:boolean = false;
  public settings: Settings;
  constructor(public appSettings:AppSettings) { 
    this.settings = this.appSettings.settings; 
  }

  public changeTheme(theme){
    this.settings.theme = theme;       
  } 
}