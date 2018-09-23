import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Category, Product, Products } from './app.models';
import { AddedToCartPopupComponent } from 'app/shared/added-to-cart-popup/added-to-cart-popup.component';

import { map } from 'rxjs/operators';

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
    filter: any = {};
    url = 'assets/data/';
    constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog) { }

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
        let param = new HttpParams();
        param = param.append('permalink', permalink);
        if (categoryId) {
            return this.http.post<Product>('/products/detail', { categoryId: categoryId }, { params: param });
        } else {
            return this.http.get<Product>('/products/detail', { params: param });
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

    // ---------------------------------------------------------------------------------------
    getBanners(): Observable<any[]> {
        return this.http.get<any[]>(this.url + 'banners.json');
    }

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

                const productData: any = { item_id: product.id, item_qty: product.quantity };

                if (res['isAddTocart']) {

                    this.addToCartApi(productData)
                        .subscribe((data) => {
                            localStorage.setItem('cart_id', data.cart_id);
                        });
                }
            });
        }
    }

    addToCartApi(productData): any {
        return this.http.get(`/cart?mode=add_item&item_id=${productData.item_id}&item_qty=${(productData.item_qty || '1')}&cart_id=${(localStorage.getItem('cart_id') || '')}`);
    }

    checkCouponCode(couponCode): any {
        return this.http.get(`/cart?mode=check_coupon&coupon=${couponCode}&cart_id=${(localStorage.getItem('cart_id') || '')}`);

    }

    getRelatedProduct(cartId) {
        return this.http.get(`/cart?mode=get_related_products&cart_id=${(cartId || localStorage.getItem('cart_id'))}`);
    }

    getCartDetails(cartId): any {
        return this.http.get(`/cart?mode=cart_details&cart_id=${(cartId || localStorage.getItem('cart_id'))}`).pipe(
            map((body: any) => {
                return body;
            })
        );
    }

    recalculatePrice(productData, item_qty): any {
        return this.http.get(`/cart?mode=update_item&item_id=${productData.item_id}&item_qty=${(item_qty || '1')}&cart_id=${(localStorage.getItem('cart_id') || '')}`);
    }

    removeFromCart(productId) {
        const index = this.Data.cartList.findIndex(p => p.id === productId);
        if (index > -1) {
            this.Data.cartList.splice(index, 1);
            this.calculateTotalPrice();
        }
    }

    removeFromCartApi(productRemove) {
        return this.http.get(`/cart?mode=remove_item&cart_id=${(productRemove.cart_id || localStorage.getItem('cart_id'))}&cart_item_id=${productRemove.cart_item_id}`);
    }

    calculateTotalPrice() {
        this.Data.totalPrice = 0;
        this.Data.totalQuantity = 0;
        for (const c of this.Data.cartList) {
            this.Data.totalPrice += Number(c.newPrice) * c.quantity;
            this.Data.totalQuantity += c.quantity;
        }
        // console.log(this.Data.totalPrice);
    }
}
