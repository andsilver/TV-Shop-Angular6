import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { CurrencyService } from 'app/services';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency: any;
  public flags = [
    { name: 'English', image: 'assets/images/flags/gb.svg' },
    { name: 'German', image: 'assets/images/flags/de.svg' },
    { name: 'French', image: 'assets/images/flags/fr.svg' },
    { name: 'Russian', image: 'assets/images/flags/ru.svg' },
    { name: 'Turkish', image: 'assets/images/flags/tr.svg' }
  ];
  public flag: any;

  constructor(public appService: AppService, public cc: CurrencyService) { }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
  }

  public changeCurrency(currency) {
    this.cc.currencyChanged(currency);
  }

  public changeLang(flag) {
    this.flag = flag;
  }
}
