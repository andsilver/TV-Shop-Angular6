import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
  Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';

import { Product } from '../../../app.models';

import { BestPriceDialogComponent } from '../best-price-dialog/best-price-dialog.component';
import { ExchangeComponent } from '../exchange/exchange.component';
import { OutdoorOpportunityDialogComponent } from '../outdoor-opportunity-dialog/outdoor-opportunity-dialog.component';
import { AddedToCartPopupComponent } from 'app/shared/added-to-cart-popup/added-to-cart-popup.component';

import { ProductsService } from '../products.service';
import { AppService } from '../../../app.service';

import { Subscription } from 'rxjs/Subscription';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-sub-product-dialog',
  templateUrl: './sub-product-dialog.component.html',
  styleUrls: ['./sub-product-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubProductDialogComponent implements OnInit, AfterViewInit {

  product: Product;

  @ViewChild(SwiperDirective)
  directiveRef: SwiperDirective;

  config: SwiperConfigInterface = {};
  image: any;
  selectedImage: any;
  relatedProducts: Array<Product>;
  subscriptions: Subscription[];
  stores: any = [];
  stockCodeColors = ['red', 'orange', 'green', 'green'];
  tooltipStore: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SubProductDialogComponent>,
    public appService: AppService,
    private dialog: MatDialog,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    console.log(this.data);
    forkJoin([
      this.appService.getProdcutByPermallink(this.data.permalink),
      this.appService.getStores()
    ])
    .subscribe(res => {
      console.log(res);
      this.product = res[0];
      this.stores = res[1];
      if (!res) {
        this.dialogRef.close();
      }
      setTimeout(() => {
        imgix.init();
        this.config.observer = true;
        this.directiveRef.setIndex(0);
      }, 1);
    });
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 1,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: true,
      preloadImages: false,
      lazy: true
    };
  }

  attributeSelected(index, event) {
    this.product.attributes[index]['selected'] = event.value;
  }

  requestBestPrice() {
    const dialogRef = this.dialog.open(BestPriceDialogComponent);

    dialogRef.afterClosed().subscribe(res => {});
  }

  exchangeProduct() {
    const dialogRef = this.dialog.open(ExchangeComponent);

    dialogRef.afterClosed().subscribe(res => {});
  }

  scrollToElement($element): void {
    $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  addToCartHash(pkg: any) {
    console.log(this.product, 'pkg under');
    this.appService.addToCartApi({
      item_id: pkg.addToCartHash,
      item_qty: 1,
      category_id: this.product.categoryId
    }).subscribe(res => {
      // if (res.cart_id !== undefined) {
      //   setTimeout(() => {
      //     this.router.navigate(['/cart']);
      //   }, 1000);
      // }
      const dialogRef = this.dialog.open(AddedToCartPopupComponent, {
        data: {
          name: pkg.main.productName,
          quantity: 1,
          newPrice: '€' + this.integer(pkg.normalPrice) + this.float(pkg.normalPrice),
          permalink: pkg.main.permalink,
          images: [
            {
              small: pkg.main.image
            }
          ]
        }
      });

      dialogRef.afterClosed().subscribe(r => {});
    });
  }

  openDemoUnit(product) {
    const dialogRef = this.dialog.open(OutdoorOpportunityDialogComponent, {
      data: product
    });
    dialogRef.afterClosed().subscribe(res => {

    });
  }

  integer(str: string) {
    return str.split(',')[0] + ',';
  }

  float(str: string) {
    const v = str.split(',')[1];
    return Number(v) === 0 ? '-' : v;
  }

  likeItem(review) {
    this.productsService.likeReviewItem(review.reviewId).subscribe(res => {
      console.log(res);
      review.reviewLikeCount = res['reviewLikeCount'];
    });
  }

}
