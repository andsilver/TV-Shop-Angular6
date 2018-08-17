import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'brandSearchPipe', pure: false })
export class BrandSearchPipe implements PipeTransform {
  transform(brands, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (brands) {
      return brands.filter(brand => {
        if (brand.name) {
          return brand.name.search(searchText) !== -1;
        }
      });
    }
  }
}