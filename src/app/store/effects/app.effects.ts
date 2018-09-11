import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { AppService } from 'app/app.service';

import * as ProductsActions from '../actions/products.action';
import * as BrandsActions from '../actions/brands.action';
import * as CategoriesActions from '../actions/categories.action';
import * as ProductActions from '../actions/product.action';

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
  GetCategory: Observable<any>
    = this.actions
        .ofType(ProductsActions.MODE_PRODUCTS)
        .pipe(
          map((action: any) => action.payload),
          switchMap(payload => {
            return this.appService.getProducts(payload)
              .pipe(
                map(data => new ProductsActions.SuccessProducts(data)),
                catchError(err => {
                  return of(new ProductsActions.FailedProducts({ message: err.message}));
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
          this.appService.getBrandsByCategoryId(action.payload)
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
          map(data => {
            console.log(data);
            return new CategoriesActions.SuccessGetCategories(data);
          }),
          catchError(err => of(new CategoriesActions.FailedGetCategories({ message: err.message })))
        );

  @Effect()
  GetProduct: Observable<any>
    = this.actions
        .ofType(ProductActions.GET_PRODUCT)
        .pipe(
          map((action: any) => action.payload),
          switchMap(payload => {
            return this.appService.getProdcutByPermallink(payload.permalink, payload.categoryId)
              .pipe(
                map(data => new ProductActions.SaveProduct(data))
              );
          })
        );
}

