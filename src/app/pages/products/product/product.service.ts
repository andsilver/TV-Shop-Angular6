import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AppService } from 'app/app.service';

import { Store } from '@ngrx/store';
import { State } from 'app/store';

import * as fromProduct from 'app/store/actions/product.action';

@Injectable()
export class ProductService implements Resolve<any> {

  constructor( private store: Store<State>, private appService: AppService) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot ): Observable<any> | Promise<any> | any {
    return new Promise(( resolve, reject ) => {

        this.appService.getProductById(route.params.id)
          .subscribe(res => {
            this.store.dispatch(new fromProduct.SaveProduct(res));
            resolve(res);
          },
          reject
        );
    });
  }
}
