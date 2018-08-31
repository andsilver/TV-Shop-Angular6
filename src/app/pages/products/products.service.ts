import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { RoutingHandlerService } from 'app/services';
import { ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';

@Injectable()
export class ProductsService implements Resolve<any> {
  public categories = [];
  public brands;

  constructor(private appService: AppService, private routing: RoutingHandlerService, private router: Router ) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(( resolve, reject ) => {
        forkJoin([this.appService.getCategories(), this.appService.getBrands()]).subscribe(subs => {
          this.categories = subs[0];
          this.brands = subs[1].manufacturer;
          resolve(subs);
        }, reject);
    });
  }
}
