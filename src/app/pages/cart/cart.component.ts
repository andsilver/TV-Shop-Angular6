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
  cartId: string = '';
  totalPrice :number = 0;
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit() {
    this.grandTotal = this.appService.Data.totalPrice;
    this.cartId = localStorage.getItem('cart_id');
    this.appService.getCartDetails(this.cartId).subscribe((result) => {
      for (var key in result.cart_contents) {
        console.log(key, 'key');
        this.productData.push(result.cart_contents[key])
      }
    });
  }



  public getTotalPrice(value) {
    if (value) {
      const product = this.appService.Data.cartList.find(p => p.id === value.productId);
      this.appService.addToCart(product, value.soldQuantity);
      this.grandTotal = this.appService.Data.totalPrice;
    }
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
          console.log('item remove successfully');
          this.router.navigate(['/cart']);
        }
      });
    }

  }

}
