import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as fromProducts from 'app/store/actions/products.action';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public keyword = '';
  public searchPerformed = new Subject();

  constructor( private router: Router, private store: Store<State> ) { }

  public search(keyword: string, navigate: boolean) {
    this.keyword = keyword;
    if (navigate) {
      this.router.navigate(['/products']);
    }
    this.searchPerformed.next();
  }

  public runFilter(filter) {
    filter.keyword = this.keyword;
    this.store.dispatch(new fromProducts.FilterProducts(filter));
  }
}
