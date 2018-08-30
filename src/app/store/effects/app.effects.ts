import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { FILTER_PRODUCTS } from '../actions/products.action';
import { AppService } from 'app/app.service';
import * as ProductsActions from '../actions/products.action';

@Injectable()
export class AppEffects {

  constructor(private actions: Actions, private appService: AppService) {}

  @Effect()
  Filter_Products: Observable<any>
    = this.actions
      .ofType(FILTER_PRODUCTS)
      .pipe(
        map((action: any) => action.payload),
        switchMap(payload => {
          return this.appService.getProductsByFilter(payload)
            .pipe(
              map(data => {
                console.log(data);
                return new ProductsActions.SuccessProducts(data);
              }),
              catchError(err => {
                return of(new ProductsActions.FailedProducts({ message: err.message }));
              })
            );
        })
      );

}

