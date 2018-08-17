import { Injectable, EventEmitter } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { environment } from 'environments/environment'

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor( private spinner: NgxSpinnerService) {}

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show();

        const local = "assets/data"
        const url = req.url.indexOf(environment.apiUrl) > -1 ? req.url : `${environment.apiUrl}${req.url}`;
        const apiReq = req.clone({ url: url });

        return next.handle(req.url.indexOf(local) > -1 ? req : apiReq).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
             this.spinner.hide();
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            const started = Date.now();
            const elapsed = Date.now() - started;
            console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
           // debugger;
          }
        })
    }
}
