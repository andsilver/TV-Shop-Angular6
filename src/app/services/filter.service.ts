import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RoutingHandlerService } from 'app/services/routing-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public keyword = '';
  public searchPerformed = new Subject();

  constructor( private routing: RoutingHandlerService, private router: Router ) { }

  public search(keyword: string) {
    this.keyword = keyword;
    if (this.router.url.indexOf('products') > 0) {
      const paths = this.router.url.split('/');
      if (paths.length < 3 || +paths[2]) {
        this.routing.productsPage();
        this.searchPerformed.next();
      } else {
        this.routing.productsPage(paths[2]);
        this.searchPerformed.next();
      }
    } else if (this.router.url.indexOf('brands') > 0) {
      this.routing.redirectTo(this.router.url);
      this.searchPerformed.next();
    } else {
      this.routing.productsPage();
      this.searchPerformed.next();
    }
  }
}
