import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';
import { Product } from 'app/app.models';

@Injectable()
export class HomeService implements Resolve<any> {

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;
  banners = [];
  brands = [];

  constructor(private appService: AppService, private router: Router ) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(( resolve, reject ) => {

        forkJoin([
          this.appService.getBanners(),
          this.appService.getBrandsByCategoryId(0),
          this.appService.getProducts('featured'),
          this.appService.getProducts('on-sale'),
          this.appService.getProducts('top-rated'),
          this.appService.getProducts('new-arrivals')
        ])
        .subscribe(res => {
          this.banners = res[0];
          this.brands = res[1].manufacturer;
          this.featuredProducts = res[2].products;
          this.onSaleProducts = res[3].products;
          this.topRatedProducts = res[4].products;
          this.newArrivalsProducts = res[5].products;
          resolve(res);
        }, reject);
    });
  }
}
