import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';

@Injectable()
export class BrandsService implements Resolve<any> {
  public categories = [];

  constructor(private appService: AppService) { }

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise(( resolve, reject ) => {
       this.appService.getCategories().subscribe(data => {
          this.categories = data;
          resolve(data);
        }, reject);
    });
  }
}
