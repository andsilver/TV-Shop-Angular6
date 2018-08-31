import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { RoutingHandlerService } from 'app/services/routing-handler.service';
import { Category } from 'app/app.models';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as fromProducts from 'app/store/actions/products.action';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public keyword = '';
  public searchPerformed = new Subject();

  constructor( private routing: RoutingHandlerService, private router: Router, private store: Store<State> ) { }

  public search(keyword: string) {
    this.keyword = keyword;
    if (this.router.url.indexOf('products') > 0) {
      const paths = this.router.url.split('/');
      if (paths.length < 3 || +paths[2]) {
        this.routing.productsPage();
      } else {
        this.routing.productsPage(paths[2]);
      }
    } else if (this.router.url.indexOf('brands') > 0) {
      this.routing.redirectTo(this.router.url);
    } else {
      this.routing.productsPage();
    }
    this.searchPerformed.next();
  }

  public runFilter(filter) {
    filter.keyword = this.keyword;
    this.store.dispatch(new fromProducts.FilterProducts(filter));
  }
}
