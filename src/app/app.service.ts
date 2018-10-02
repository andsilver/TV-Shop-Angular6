import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Category, Product, Products } from './app.models';
import { AddedToCartPopupComponent } from 'app/shared/added-to-cart-popup/added-to-cart-popup.component';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as CartActions from './store/actions/cart.action';

export class Data {
    constructor(
        public categories: Category[],
        public compareList: Product[],
        public wishList: Product[],
        public cartList: Product[],
        public totalPrice: number,
        public totalQuantity: number) { }
}

@Injectable()
export class AppService {

    Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  // cartList
        null, // totalPrice
        0
    );

    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private store: Store<State>) { }

    /* +------------+
    *  |    Apis    |
    *  +------------+
    */

    getCategories(mode: string = 'tree'): Observable<Category[]> {
        let params = new HttpParams();
        params = params.append('mode', mode);
        return this.http.get<Category[]>('/categories', { params: params });
    }


    getProductsByFilter(filter: any): Observable<Products> {
        return this.http.post<Products>('/products/search', filter);
    }


    productPagination(limit, page, params): Observable<Products> {
        params = params.append('limit', `${limit}`);
        params = params.append('page', `${page}`);
        return this.http.get<Products>(`/products/listing`, { params: params });
    }


    getProdcutByPermallink(permalink: string, categoryId: number = null): Observable<Product> {
        let params = new HttpParams();
        params = params.append('permalink', permalink);
        if (categoryId) {
            return this.http.post<Product>('/products/detail', { categoryId: categoryId }, { params: params });
        } else {
            return this.http.get<Product>('/products/detail', { params: params });
        }
    }

    getBrands(limit: number = 100, page: number = 1) {
        let params = new HttpParams();
        params = params.append('limit', `${limit}`);
        params = params.append('page', `${page}`);
        return this.http.get<any>('/manufacturers', { params: params });
    }

    getBrandsByCategoryId(id: number) {
        let params = new HttpParams();
        params = params.append('categoryId', `${id}`);
        return this.http.get<any>('/manufacturers', { params: params });
    }

    getStores() {
        return this.http.get<any>('/getStores');
    }

    getStoreByName(name: string): Observable<any> {
        return this.http.get<any>(`/getStoreByName/${name}`);
    }

    addToCartApi(productData): any {
        let params = new HttpParams();
        params = params.append('mode', 'add_item');
        params = params.append('item_id', `${productData.item_id}`);
        params = params.append('item_qty', `${productData.item_qty || '1'}`);
        params = params.append('cart_id', `${(localStorage.getItem('cart_id') || '')}`);
        return this.http.get('/cart', {params: params});
    }

    checkCouponCode(couponCode): any {
        let params = new HttpParams();
        console.log(couponCode);
        params = params.append('mode', 'check_coupon');
        params = params.append('coupon', `${couponCode.coupon}`);
        params = params.append('cart_id', `${localStorage.getItem('cart_id') || ''}`);
        return this.http.get('/cart', {params: params});
    }

    getRelatedProduct(cartId) {
        let params = new HttpParams();
        params = params.append('mode', 'get_related_products');
        params = params.append('cart_id', `${cartId || localStorage.getItem('cart_id')}`);
        return this.http.get('/cart', {params: params});
    }

    getCartDetails(cartId): any {
        let params = new HttpParams();
        params = params.append('mode', 'cart_details');
        params = params.append('cart_id', `${cartId || localStorage.getItem('cart_id')}`);
        return this.http.get('/cart', {params: params});
    }

    recalculatePrice(productData, item_qty): any {
        let params = new HttpParams();
        params = params.append('mode', 'update_item');
        params = params.append('item_id', `${productData.item_id}`);
        params = params.append('item_qty', `${item_qty || '1'}`);
        params = params.append('cart_id', `${localStorage.getItem('cart_id') || ''}`);
        return this.http.get('/cart', {params: params});
    }

    removeFromCartApi(productRemove) {
        let params = new HttpParams();
        params = params.append('mode', 'remove_item');
        params = params.append('cart_id', `${productRemove.cart_id || localStorage.getItem('cart_id')}`);
        params = params.append('cart_item_id', `${productRemove.cart_item_id}`);
        return this.http.get('/cart', {params: params});
    }

    /* +------------+
    *  |    Util    |
    *  +------------+
    */

    addToCompare(product: Product) {
        let message, status;
        if (this.Data.compareList.filter(item => item.id === product.id)[0]) {
            message = 'Product ' + product.name + ' is reeds toegevoegd aan uw vergelijkingslijst.';
            status = 'error';
        } else {
            this.Data.compareList.push(product);
            message = 'Product ' + product.name + ' is toegevoegd aan uw vergelijkingslijst.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    addToWishList(product: Product) {
        let message, status;
        const index = this.Data.wishList.findIndex(item => item.id === product.id);
        if (index > -1) {
            this.Data.wishList[index] = product;
            message = 'Product ' + product.name + ' is aangepast op uw wensenlijst.';
            status = 'success';
        } else {
            this.Data.wishList.push(product);
            message = 'Product ' + product.name + ' is toegevoegd aan uw wensenlijst.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    addToCart(product: Product, count: number = 1, openPopup: boolean = false) {
        let message, status;
        if (product.attributes && product.attributes.find(attr => attr.required && !attr.selected)) {
            message = 'Verplichte attributen zijn niet geselecteerd.';
            status = 'error';
            this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
            return;
        }
        if (this.Data.cartList.some(item => item.id === product.id)) {
            const index = this.Data.cartList.findIndex(p => p.id === product.id);
            count += this.Data.cartList[index].quantity;
            product.quantity = count;
            this.Data.cartList[index] = product;
            message = 'Product ' + product.name + ' in uw winkelwagen is aangepast.';
            status = 'success';
        } else {
            product.quantity = count;
            this.Data.cartList.push(product);
            message = 'Product ' + product.name + ' is toegevoegd aan uw winkelwagen.';
            status = 'success';
        }

        this.calculateTotalPrice();

        if (openPopup) {

            const dialogRef = this.dialog.open(AddedToCartPopupComponent, {
                data: product
            });

            dialogRef.afterClosed().subscribe(res => {

                const productData: any = { item_id: product.id, item_qty: product.quantity, category_id: product.categoryId };

                if (res['isAddTocart']) {

                    this.addToCartApi(productData)
                        .subscribe((data) => {
                            localStorage.setItem('cart_id', data.cart_id);
                            this.store.dispatch(new CartActions.SetCartId(data.cart_id));
                        });
                }
            });
        }
    }

    removeFromCart(productId) {
        const index = this.Data.cartList.findIndex(p => p.id === productId);
        if (index > -1) {
            this.Data.cartList.splice(index, 1);
            this.calculateTotalPrice();
        }
    }

    calculateTotalPrice() {
        this.Data.totalPrice = 0;
        this.Data.totalQuantity = 0;
        for (const c of this.Data.cartList) {
            this.Data.totalPrice += Number(c.newPrice) * c.quantity;
            this.Data.totalQuantity += c.quantity;
        }
    }
}
