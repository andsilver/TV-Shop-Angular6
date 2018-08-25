import { Injectable } from '@angular/core';
import { Subject, Observable, forkJoin } from 'rxjs';
import { RoutingHandlerService } from 'app/services';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, Resolve, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';

@Injectable({
  providedIn: 'root'
})
export class BrandsService implements Resolve<any> {
  public keyword = '';
  public searchPerformed = new Subject();
  public categories = [];

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
    return new Promise(( resolve, reject ) => {
       this.appService.getCategories().subscribe(data => {
          this.categories = data;
          resolve(data);
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
