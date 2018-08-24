import { Injectable } from '@angular/core';
import { Subject, Observable, forkJoin } from 'rxjs';
import { RoutingHandlerService } from 'app/services';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService implements Resolve<any> {
  public keyword = '';
  public searchPerformed = new Subject();
  public categories = [];
  public brands;

  constructor(private appService: AppService,
              private routing: RoutingHandlerService,
              private route: ActivatedRoute,
              private router: Router ) { }

  /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
      // return this.appService._getUserById( 1 );

      return new Promise(( resolve, reject ) => {
          forkJoin([this.appService.getCategories(), this.appService._getBrands()]).subscribe(subs => {
            this.categories = subs[0];
            this.brands = subs[1];
            resolve(subs);
          }, reject);
      });
   }

  public search(keyword: string) {
    this.keyword = keyword;
    if (this.router.url.indexOf('products') > 0) {
      const paths = this.router.url.split('/');
    if (paths.length < 3 || +paths[2]) {
        this.routing.productsPage();
        this.searchPerformed.next();
    } else {
        this.routing.productsPage(paths[2]);
        this.searchPerformed.next();
      }
    } else {
      this.routing.productsPage();
      this.searchPerformed.next();
    }
  }
}
