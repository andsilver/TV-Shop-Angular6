import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Category, Product, Products } from './app.models';
import { AddedToCartPopupComponent } from 'app/shared/added-to-cart-popup/added-to-cart-popup.component';

import * as countries from 'assets/data/countries.json';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

export class Data {
    constructor(public categories: Category[],
        public compareList: Product[],
        public wishList: Product[],
        public cartList: Product[],
        public totalPrice: number,
        public totalQuantity: number) { }
}

@Injectable()
export class AppService {
    public Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  // cartList
        null, // totalPrice
        0
    );
    public filter: any = {};
    public url = 'assets/data/';
    constructor(public http: HttpClient, public snackBar: MatSnackBar, private dialog: MatDialog) { }

    /***
    *  ---------------- New Apis -----------------------------------------------------------
    **/
    public getCategories(): Observable<Category[]> {
        let params = new HttpParams();
        params = params.append('mode', 'tree');
        return this.http.get<Category[]>('/categories', { params: params });
    }

    public getCategoriesByParentId(parentId, limit: number = 10): Observable<Category[]> {
        let params = new HttpParams();
        params = params.append('mode', 'parent');
        params = params.append('parentId', parentId);
        params = params.append('limit', `${limit}`);
        return this.http.get<Category[]>(`/categories`, { params: params });
    }

    public getProducts(mode: string, limit: number = 10, page: number = 1): Observable<Products> {
        let params = new HttpParams();
        params = params.append('mode', mode);
        return this.productPagination(limit, page, params);
    }

    public getProductsByCategory(categoryId: number, limit: number = 6, page: number = 1) {
        let params = new HttpParams();
        params = params.append('mode', 'category');
        params = params.append('category_id', `${categoryId}`);
        return this.productPagination(limit, page, params);
    }

    public getProductsByFilter(filter: any): Observable<Products> {
        return this.http.post<Products>('/products/search', filter);
    }

    public getProductsByBrand(brand: string, limit: number = 6, page: number = 1) {
        let params = new HttpParams();
        params = params.append('mode', 'brand');
        params = params.append('brands_name', brand);
        return this.productPagination(limit, page, params);
    }

    public productPagination(limit, page, params): Observable<Products> {
        params = params.append('limit', `${limit}`);
        params = params.append('page', `${page}`);
        return this.http.get<Products>(`/products/listing`, { params: params });
    }


    public getProduct(id, categoryId) {
        return this.http.post<any>(`/products/listing`, { categoryId: categoryId });
    }

    public getProductById(id): Observable<Product> {
        return this.http.get<Product>(`/products/${id}/detail`);
    }

    public getProdcutByPermallink(permalink: string, categoryId: number = null): Observable<Product> {
        let param = new HttpParams();
        param = param.append('permalink', permalink);
        if (categoryId) {
            return this.http.post<Product>('/products/detail', { categoryId: categoryId }, { params: param });
        } else {
            return this.http.get<Product>('/products/detail', { params: param });
        }
    }

    public getBrands(limit: number = 100, page: number = 1) {
        let params = new HttpParams();
        params = params.append('limit', `${limit}`);
        params = params.append('page', `${page}`);
        return this.http.get<any>('/manufacturers', { params: params });
    }

    public getBrandsByCategoryId(id: number) {
        let params = new HttpParams();
        params = params.append('categoryId', `${id}`);
        return this.http.get<any>('/manufacturers', { params: params });
    }

    public getStores() {
        return this.http.get<any>('/getStores');
    }

    public getStoreById(id: number) {
        return this.http.get<any>(`/getStores/${id}`);
    }

    public getStoreByName(name: string): Observable<any> {
        return this.http.get<any>(`/getStoreByName/${name}`);
    }

    public _getUserById(id): Observable<any> {
        return this.http.get<any>(`/users/${id}/info`);
    }

    // ---------------------------------------------------------------------------------------
    public getBanners(): Observable<any[]> {
        return this.http.get<any[]>(this.url + 'banners.json');
    }

    public addToCompare(product: Product) {
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

    public addToWishList(product: Product) {
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

    public addToCart(product: Product, count: number = 1, openPopup: boolean = false) {
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
                if (res.isAddTocart !== undefined) {
                    this.addToCardApi(productData).subscribe((data) => {
                        localStorage.setItem('cart_id', data.cart_id)
                    });
                }
            });
        }
    }

    public addToCardApi(productData): any {
        return this.http.get(environment.apiUrl + '/cart?mode=add_item&item_id=' + productData.id + '&item_qty=' + productData.quantity).pipe(
            map((body: any) => {
                return body;
            })
        );
    }

    public getCartDetails(cartId): any {

        return this.http.get(environment.apiUrl + '/cart?mode=cart_details&cart_id=' + cartId).pipe(
            map((body: any) => {
                return body;
            })
        );
    }

    public removeFromCart(productId) {
        const index = this.Data.cartList.findIndex(p => p.id === productId);
        if (index > -1) {
            this.Data.cartList.splice(index, 1);
            this.calculateTotalPrice();
        }
    }

    public removeFromCartApi(productRemove) {
        return this.http.get(environment.apiUrl + '/cart?mode=remove_item&cart_id=' + productRemove.cart_id + '&cart_item_id=' + productRemove.cart_item_id).pipe(
            map((body: any) => {
                return body;
            })
        );
    }

    public calculateTotalPrice() {
        this.Data.totalPrice = 0;
        this.Data.totalQuantity = 0;
        for (const c of this.Data.cartList) {
            this.Data.totalPrice += Number(c.newPrice) * c.quantity;
            this.Data.totalQuantity += c.quantity;
        }
        // console.log(this.Data.totalPrice);
    }

    public getCountries() {
        return countries['countries'];
    }

    public getMonths() {
        return [
            { value: '01', name: 'January' },
            { value: '02', name: 'February' },
            { value: '03', name: 'March' },
            { value: '04', name: 'April' },
            { value: '05', name: 'May' },
            { value: '06', name: 'June' },
            { value: '07', name: 'July' },
            { value: '08', name: 'August' },
            { value: '09', name: 'September' },
            { value: '10', name: 'October' },
            { value: '11', name: 'November' },
            { value: '12', name: 'December' }
        ];
    }

    public getYears() {
        return ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];
    }

    public getDeliveryMethods() {
        return [
            { value: 'free', name: 'Gratis levering via PostNL', desc: '$0.00 / Vandaag besteld, morgen in huis' },
            { value: 'express', name: 'Spoedlevering via PostNL', desc: '$29.99 / Vandaag besteld, dezelfde dag bezorgd' }
        ];
    }

}
