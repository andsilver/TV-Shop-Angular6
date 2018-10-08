import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class CheckoutService {

    public stepChanged: Subject<any> = new Subject();

    constructor(private http: HttpClient) {}

    checkoutCustomer(data) {
        let params = new HttpParams();
        params = params.append('cart_id', `${(localStorage.getItem('cart_id') || '')}`);
        return this.http.post('/checkout/customer/set', data, {params: params});
    }

    getMethodsWidget() {
        let params = new HttpParams();
        params = params.append('cart_id', `${(localStorage.getItem('cart_id') || '')}`);
        return this.http.get('/checkout/methods/get', {params: params});
    }

    setMethod(data) {
        let params = new HttpParams();
        params = params.append('cart_id', `${(localStorage.getItem('cart_id') || '')}`);
        return this.http.post('/checkout/methods/set', data, {params: params});
    }

    getOrderView() {
        let params = new HttpParams();
        params = params.append('cart_id', `${(localStorage.getItem('cart_id') || '')}`);
        return this.http.get('/checkout/methods/overview', {params: params});
    }

    placeOrder() {
        let params = new HttpParams();
        params = params.append('cart_id', `${(localStorage.getItem('cart_id') || '')}`);
        return this.http.get('/checkout/methods/process', {params: params});
    }
}

