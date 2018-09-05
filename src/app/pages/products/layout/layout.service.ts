import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, ActivatedRoute, UrlSegment } from '@angular/router';
import { AppService } from 'app/app.service';
import { Category, Product } from 'app/app.models';

import { Store } from '@ngrx/store';
import { State } from 'app/store';

import * as fromProduct from 'app/store/actions/product.action';
import * as fromCategory from 'app/store/actions/category.action';

@Injectable()
export class LayoutService implements Resolve<any> {

  categories = [];
  // category

  constructor( private store: Store<State>, private appService: AppService, private route: ActivatedRoute ) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot ): Observable<any> | Promise<any> | any {
    return new Promise(( resolve, reject ) => {
      this.store.select(state => state.categories)
        .pipe(
          switchMap(res => {
            this.categories = res.categories;
            return this.route.url;
          })
        )
        .subscribe((segments: UrlSegment[]) => {

        });
      this.route.url
        .subscribe((paths: UrlSegment[]) => {

          const last = paths[paths.length - 1];

        });
    });
  }
}
