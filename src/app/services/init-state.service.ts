import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import { AppService } from 'app/app.service';
import * as fromCategories from 'app/store/actions/categories.action';
import * as fromBrands from 'app/store/actions/brands.action';

@Injectable({
  providedIn: 'root'
})
export class InitStateService implements Resolve<any> {

  constructor(private store: Store<State>, private router: Router, private appService: AppService) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(( resolve, reject ) => {
        forkJoin([this.appService.getCategories(), this.appService.getBrands()])
          .subscribe(subs => {
            this.store.dispatch(new fromCategories.SuccessGetCategories(subs[0]));
            this.store.dispatch(new fromBrands.SuccessGetBrands(subs[1]));
            resolve(subs);
          },
          reject
        );
    });
  }
}
