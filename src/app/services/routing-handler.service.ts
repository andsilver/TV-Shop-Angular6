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

  public productsPage( category: string = '' ) {
    if ( category ) {
      this.redirectTo(`${routes.productsPage}/${category.toLowerCase()}`);
    } else {
      this.redirectTo(routes.productsPage);
    }
  }

  public toDetailsPage(nav: any) {
    const paths = nav.crumbPath;
    paths.push(nav);
    const url = this.convertURL(paths);
    console.log(url);
    this.store.dispatch(new fromProduct.SaveProduct(nav));
    this.store.dispatch(new fromCategory.RemoveCategory());
    this.redirectTo(url);
  }

  public toProductsPage(nav: any) {

  }

  public convertURL(paths) {
    let url = `/products/`;
    for (const seg of paths) {
      url += `${seg.name}/`;
    }
    return url.toLocaleLowerCase().replace(/ /g, '-');
  }
}
