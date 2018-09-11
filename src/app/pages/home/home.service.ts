import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
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
          this.appService.getBrandsByCategoryId(0)
        ])
        .subscribe(res => {
          this.banners = res[0];
          this.brands = res[1].manufacturer;
          resolve(res);
        }, reject);
    });
  }
}
