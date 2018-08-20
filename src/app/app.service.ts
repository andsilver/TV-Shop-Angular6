import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { Category, Product } from './app.models';
import * as countries from 'assets/data/countries.json';
import * as brands from 'assets/data/brands.json';

export class Data {
    constructor(public categories: Category[],
                public compareList: Product[],
                public wishList: Product[],
                public cartList: Product[],
                public totalPrice: number) { }
}

@Injectable()
export class AppService {
    public Data = new Data(
        [], // categories
        [], // compareList
        [],  // wishList
        [],  // cartList
        null //totalPrice
    )
    public url = "assets/data/";
    constructor(public http:HttpClient, public snackBar: MatSnackBar) { }

    /***
    *  ---------------- New Apis -----------------------------------------------------------
    **/

    public getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>('/categories');
    }

    public getCategoriesByParentId( parentId, limit: number = -1 ): Observable<Category[]> {
        var params = new HttpParams();
        params = params.append('mode', 'parent');
        params = params.append('parentId', parentId);
        if(limit > -1)
           params = params.append('limit', `${limit}`);
        return this.http.get<Category[]>(`/categories`, { params: params });
    }

    public getProducts(type: string, categoryId: number = -1, limit: number = -1, page: number = -1): Observable<Product[]>{

        var params = new HttpParams();
        params = params.append('mode', type)
        if ( type == "category" )
            params = params.append('category_id', `${categoryId}`)
        if ( limit > -1 )
            params = params.append("limit", `${limit}`);
        if ( page > -1 )
            params = params.append("page", `${page}`);

        return this.http.get<Product[]>(`/products/listing`, { params: params });
    }

    public getProductById(id): Observable<Product> {
        return this.http.get<Product>(`/products/${id}/detail`);
    }

    public _getUserById(id): Observable<any> {
        return this.http.get<any>(`/users/${id}/info`);
    }

    // ---------------------------------------------------------------------------------------

    public _getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(this.url + 'categories.json');
    }

    public _getProducts(type): Observable<Product[]>{
        return this.http.get<Product[]>(this.url + type + '-products.json');
    }

    public _getProductById(id): Observable<Product>{
        return this.http.get<Product>(this.url + 'product-' + id + '.json');
    }

    public getBanners(): Observable<any[]>{
        return this.http.get<any[]>(this.url + 'banners.json');
    }

    public addToCompare(product:Product){
        let message, status;
        if(this.Data.compareList.filter(item=>item.id == product.id)[0]){
            message = 'The product ' + product.name + ' already added to comparison list.';
            status = 'error';
        }
        else{
            this.Data.compareList.push(product);
            message = 'The product ' + product.name + ' has been added to comparison list.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public addToWishList(product:Product){
        let message, status;
        if(this.Data.wishList.some(item=>item.id == product.id)){
            message = 'The product ' + product.name + ' already added to wish list.';
            status = 'error';
        }
        else{
            this.Data.wishList.push(product);
            message = 'The product ' + product.name + ' has been added to wish list.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public addToCart(product:Product){
        let message, status;
        if(this.Data.cartList.some(item=>item.id == product.id)){
            message = 'The product ' + product.name + ' already added to cart.';
            status = 'error';
        }
        else{
            this.Data.totalPrice = null;
            this.Data.cartList.push(product);
            this.Data.cartList.forEach(product=>{
                this.Data.totalPrice = this.Data.totalPrice + product.newPrice;
            })
            message = 'The product ' + product.name + ' has been added to cart.';
            status = 'success';
        }
        this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }

    public getBrands(){
        return brands['brands'];
    }

    public getCountries(){
        return countries['countries'];
    }

    public getMonths(){
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
        ]
    }

    public getYears(){
        return ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030" ]
    }

    public getDeliveryMethods(){
        return [
            { value: 'free', name: 'Free Delivery', desc: '$0.00 / Delivery in 7 to 14 business Days' },
            { value: 'standard', name: 'Standard Delivery', desc: '$7.99 / Delivery in 5 to 7 business Days' },
            { value: 'express', name: 'Express Delivery', desc: '$29.99 / Delivery in 1 business Days' }
        ]
    }

}
