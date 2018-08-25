import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const routes = {
  homePage: '/',
  productsPage: '/products',
};

@Injectable({
  providedIn: 'root'
})
export class RoutingHandlerService {

  constructor(private router: Router) { }

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
}
