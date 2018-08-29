import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  constructor(public appService: AppService) { }

  ngOnInit() {
    this.grandTotal = this.appService.Data.totalPrice;
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

}
