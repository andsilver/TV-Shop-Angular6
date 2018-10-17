import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'app/store';
import { SaveCrumbPath } from 'app/store/actions/crumb-path.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  total = [];
  grandTotal = 0;
  addCouponForm = false;
  productData: any = [];
  relatedProductData: any = [];
  cartId = '';
  totalPrice = 0;
  couponCode = '';
  loaded = false;

  subscriptions = [];

  constructor(public appService: AppService, private router: Router, private store: Store<State>) {}

  ngOnInit() {

    this.store.dispatch(new SaveCrumbPath([
      {
        name: 'Cart',
        permalink: '/cart'
      }
    ]));

    this.subscriptions = [
      this.store.select(state => state.cart).subscribe(res => {
        this.cartId = res.CartId;
        if (!this.cartId) {
          return;
        }
        console.log(this.cartId);
        this.getCartDetails();
        this.getRelatedProduct();
        this.grandTotal = this.appService.Data.totalPrice;
      })
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getCartDetails() {
    this.appService.getCartDetails(this.cartId).subscribe((result) => {
      this.productData = result.cart_contents ? result.cart_contents : [];
      this.productData = this.productData.map((p) => {
        p.item_qty_copy = p.item_qty;
        return p;
      });
      this.totalPrice = this.getTotalPrice(this.productData);
      setTimeout(() => imgix.init(), 1);
      this.loaded = true;
    });
  }

  public getTotalPrice(productArray) {
    if (!productArray) {
      return 0;
    }
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
      const removeProductData: any = { 'item_id': product.item_id, 'cart_id': this.cartId };
      this.appService.removeFromCartApi(removeProductData).subscribe((response) => {
        this.getCartDetails();
        this.getRelatedProduct();
      });
    }
  }

  public verifyCouponCode() {
    if (this.couponCode !== undefined) {
      const couponCodeData: any = { 'coupon': this.couponCode };
      this.appService.checkCouponCode(couponCodeData).subscribe((response) => {
        if (response.cart_coupon.valid !== undefined && response.cart_coupon.valid) {
          console.log(response, 'coupon code is valid');
          if (response.cart_subtotal !== undefined) {
            this.totalPrice = response.cart_subtotal;
          }
          // this.getCartDetails()
        }
      });
    }
  }

  public getRelatedProduct() {
    if (this.cartId !== undefined) {
      this.appService.getRelatedProduct(this.cartId).subscribe((result) => {
        this.relatedProductData = result['cart_related_product'];
        console.log(this.relatedProductData, 'related products');
      });
    }
  }

  public addToCartApi(product) {
    if (product.item_id !== undefined) {
      this.appService.addToCartApi(product).subscribe((response) => {
        this.getCartDetails();
        this.getRelatedProduct();
        console.log(response, 'add to cart');
      });
    }
  }

  public recalculatePrice(product) {
    if (product.item_id !== undefined) {
      this.appService.recalculatePrice(product, product.item_qty_copy).subscribe((response) => {
        this.getCartDetails();
        this.getRelatedProduct();
        console.log(response, 'recalculation product price');
      });
    }
  }

  public navigate(permalink) {
    if (permalink) {
      this.router.navigate([permalink]);
    }
  }

}
