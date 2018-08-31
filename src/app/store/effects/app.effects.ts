import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { AppService } from 'app/app.service';

import * as ProductsActions from '../actions/products.action';
import * as BrandsActions from '../actions/brands.action';
import * as CategoriesActions from '../actions/categories.action';

@Injectable()
export class AppEffects {

  constructor(private actions: Actions, private appService: AppService) {}

  @Effect()
  FilterProducts: Observable<any>
    = this.actions
      .ofType(ProductsActions.FILTER_PRODUCTS)
      .pipe(
        map((action: any) => action.payload),
        switchMap(payload => {
          return this.appService.getProductsByFilter(payload)
            .pipe(
              map(data => new ProductsActions.SuccessProducts(data)),
              catchError(err => {
                return of(new ProductsActions.FailedProducts({ message: err.message }));
              })
            );
        })
      );

  @Effect()
  GetBrands: Observable<any>
    = this.actions
      .ofType(BrandsActions.GET_BRANDS)
      .pipe(
        switchMap((action: any) =>
          this.appService.getBrands()
            .pipe(
              map(data => new BrandsActions.SuccessGetBrands(data)),
              catchError(err => of(new BrandsActions.FailedGetBrands({ message: err.message })))
            )
          )
        );

  @Effect()
  GetCategories: Observable<any>
    = this.actions
        .ofType(CategoriesActions.GET_CATEGORIES)
        .pipe(
          map((action: any) => action.payload),
          switchMap(payload => {
            if (payload) {
              return this.appService.getCategoriesByParentId(payload);
            } else {
              return this.appService.getCategories();
            }
          }),
          map(data => new CategoriesActions.SuccessGetCategories(data)),
          catchError(err => of(new CategoriesActions.FailedGetCategories({ message: err.message })))
        );
}
