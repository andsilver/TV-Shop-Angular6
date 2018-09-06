import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as fromCategory from 'app/store/actions/category.action';
import * as fromProduct from 'app/store/actions/product.action';

const routes = {
  homePage: '/',
  productsPage: '/products',
};

@Injectable({
  providedIn: 'root'
})
export class RoutingHandlerService {

  constructor(private router: Router, private store: Store<State>) { }

  public redirectTo(commands: string) {
    this.router.navigate([commands]);
  }

  public homePage() {
    this.redirectTo(routes.homePage);
  }
}
