import { Component, ViewEncapsulation, OnInit, Inject, AfterViewInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from '../../../app.models';
import { CurrencyService } from 'app/services';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDialogComponent implements OnInit, AfterViewInit {
  public config: SwiperConfigInterface = {};
  constructor(public appService: AppService,
              public cc: CurrencyService,
              public dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
    // console.log(this.product);
  }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    };
  }

  public close(): void {
    this.dialogRef.close();
  }

  public attributeSelected(index, event) {
    this.product.attributes[index]['selected'] = event.value;
  }
}
