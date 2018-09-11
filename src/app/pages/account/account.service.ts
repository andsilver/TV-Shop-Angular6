import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppService } from '../../app.service';

@Injectable()
export class AccountService implements Resolve<any> {

  public user: any;
  public userUpdated: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor( private appService: AppService ) { }

   /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
       // return this.appService._getUserById( 1 );

       return new Promise(( resolve, reject ) => {
          this.appService._getUserById(1).subscribe(user => {
            this.user = user;
            this.userUpdated.next(this.user);
            resolve(user);
          }, reject);
       });
    }

    updateUser( user ) {
      this.user = user;
      this.userUpdated.next(this.user);
    }
}
