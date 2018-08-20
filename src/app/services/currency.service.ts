import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public default: string = "EUR";
  public currency;
  public currencies = [
  	{
  		name: "EUR",
  		unit: "€"
  	},
  	{
  		name: "USD",
  		unit: "$"
 	}
  ]

  constructor() { 
  	this.currency = this.currencies.find( c => c.name == this.default);
  }

  currencyChanged( cc ) {
  	this.currency = cc;
  }
}
