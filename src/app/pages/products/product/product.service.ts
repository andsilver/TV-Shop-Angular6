import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';
import { Product } from 'app/app.models';

@Injectable()
export class ProductService implements Resolve<any> {

  product: Product;

  constructor(private router: Router, private appService: AppService) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(( resolve, reject ) => {
        this.appService.getProductById(route.params.id)
          .subscribe(res => {
            console.log(res);
            this.product = res;
            resolve(res);
          },
          reject
        );
    });
  }
}
