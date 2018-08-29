import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { addObjectToArray } from 'app/theme/utils';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  quantities = [];

  constructor(public appService: AppService) { }

  ngOnInit() { }

  public remove(product) {
    const index: number = this.appService.Data.wishList.indexOf(product);
    if (index !== -1) {
        this.appService.Data.wishList.splice(index, 1);
    }
  }

  public clear() {
    this.appService.Data.wishList.length = 0;
  }

  public addToCart(product) {
    const quantity = this.quantities.find( p => p.productId === product.id);
    this.appService.addToCart(product, quantity ? quantity.soldQuantity : 1 );
  }

  public getAttributeName(product, id, value) {
    return product.attributes[id].values.find(v => v.products_options_values_id === value).products_options_values_name;
  }

  public saveQuantity(event) {
    this.quantities = addObjectToArray(this.quantities, event, 'productId');
  }

}
