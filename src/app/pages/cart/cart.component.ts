import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  addCouponForm = false;
  productData: any = [];
  relatedProductData: any = [];
  cartId: string = '';
  totalPrice: number = 0;
  couponCode: string = '';
  constructor(public appService: AppService, private router: Router) {
    this.cartId = localStorage.getItem('cart_id');
    this.getCartDetails();
    this.getRelatedProduct();
  }

  ngOnInit() {
    this.grandTotal = this.appService.Data.totalPrice;
  }

  public getCartDetails() {
    this.appService.getCartDetails(this.cartId).subscribe((result) => {
      this.productData = result.cart_contents;
      this.totalPrice = this.getTotalPrice(this.productData);
    });
  }

  public getTotalPrice(productArray) {
    return productArray.reduce((acc, val) => {
      return acc + (val.item_qty * val.item_price);
    }, 0);
  }

  public remove(product) {
    const index: number = this.appService.Data.cartList.indexOf(product);
    if (index !== -1) {
      this.appService.removeFromCart(product.id);
      this.grandTotal = this.appService.Data.totalPrice;
    }
  }

  public clear() {
    this.appService.Data.cartList.length = 0;
  }

  public getAttributeName(product, id, value) {
    return product.attributes[id].values.find(v => v.products_options_values_id === value).products_options_values_name;
  }

  public addCouponFormToggle() {

    this.addCouponForm = !this.addCouponForm;
  }

  /* 18th sep 2018 */
  public removeFromCart(product) {
    if (product.item_id !== undefined) {
      let removeProductData: any = { 'cart_item_id': product.item_id, 'cart_id': this.cartId };
      this.appService.removeFromCartApi(removeProductData).subscribe((response) => {
        if (response.cart_remove !== undefined) {
          this.getCartDetails();
          this.getRelatedProduct();
        }
      });
    }
  }

  public verifyCouponCode() {
    if (this.couponCode !== undefined) {
      let couponCodeData: any = { 'coupon': this.couponCode };
      this.appService.checkCouponCode(couponCodeData).subscribe((response) => {
        if (response.cart_coupon.valid !== undefined && response.cart_coupon.valid) {
          console.log(response, 'coupon code is valid');
          this.getCartDetails()
        }
      });
    }
  }

  public getRelatedProduct() {
    if (this.cartId !== undefined) {
      this.appService.getRelatedProduct(this.cartId).subscribe((result) => {
        this.relatedProductData = result.cart_related_product;
        console.log(this.relatedProductData, 'related products');
      });
    }
  }

  public addToCartApi(product) {
    if (product.item_id !== undefined) {
      this.appService.addToCartApi(product).subscribe((response) => {
        this.getCartDetails();
        this.getRelatedProduct();
        console.log(response, 'add to cart')
      });
    }
  }

  public recalculatePrice(product, item_qty) {
    if (product.item_id !== undefined && item_qty != undefined) {
      this.appService.recalculatePrice(product, item_qty).subscribe((response) => {
        this.getCartDetails();
        this.getRelatedProduct();
        console.log(response, 'recalculation product price');
      });
    }
  }

}
