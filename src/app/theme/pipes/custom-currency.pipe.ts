import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from 'app/services';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  constructor(private cc: CurrencyService) {}

  transform(value: number, decimalLength: number = 2, chunkLength: number = 3): string {

      value = value / 100 * 100;
      const currencySign = this.cc.currency.unit;
      const chunkDelimiter = this.cc.currency.chunkDelimiter;
      const decimalDelimiter = this.cc.currency.decimalDelimiter;
      const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
      const num = value.toFixed(Math.max(0, decimalLength));
      const fn = (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);

    return currencySign + fn;
  }
}
