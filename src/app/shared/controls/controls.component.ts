import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../app.service';
import { Product } from '../../app.models';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faRulerCombined } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

library.add(faHeart,faRulerCombined,faEye);

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnChanges {
  @Input() product: Product;
  @Input() type: string;
  @Output() productDialogOpened: EventEmitter<any> = new EventEmitter();
  @Output() quantityChanged: EventEmitter<any> = new EventEmitter<any>();
  public count = 1;
  public align = 'center center';
  constructor(public appService: AppService, public snackBar: MatSnackBar) { }

  ngOnChanges() {
    if (this.product) {
      const product = this.appService.Data.cartList.find(p => p.id === this.product.id);
      this.count = product ? product.quantity : 1;
    }
    this.layoutAlign();
  }

  public layoutAlign() {
    if (this.type === 'all') {
      this.align = 'space-between center';
    } else if (this.type === 'wish') {
      this.align = 'start center';
    } else {
      this.align = 'center center';
    }
  }



  public increment() {
    if (this.count < this.product.availibilityCount) {
      this.count++;
      const obj = {
        productId: this.product.id,
        soldQuantity: 1,
        total: this.count * this.product.newPrice
      };
      this.changeQuantity(obj);
    } else {
      this.snackBar.open('You can not choose more items than available. In stock '
      + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }

  public decrement() {
    if (this.count > 1) {
      this.count--;
      const obj = {
        productId: this.product.id,
        soldQuantity: -1,
        total: this.count * this.product.newPrice
      };
      this.changeQuantity(obj);
    }
  }

  public addToCompare(product: Product) {
    this.appService.addToCompare(product);
  }

  public addToWishList(product: Product) {
    this.appService.addToWishList(product);
  }

  public addToCart(product: Product) {
    this.appService.addToCart(product, this.count, true);
  }

  public openProductDialog(event) {
    this.productDialogOpened.emit(event);
  }

  public changeQuantity(value) {
      this.quantityChanged.emit(value);
  }

}
