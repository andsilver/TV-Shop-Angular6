import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product } from 'app/app.models';
declare var imgix: any;

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit, AfterViewInit {

  @Input() products: Array<Product> = [];
  public config: SwiperConfigInterface = {};

  constructor(public appService: AppService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 4,
        }
      }
    };

    setTimeout(() => imgix.init(), 1);
  }

  public openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(p => {
      if (p) {
        this.router.navigate([p.permalink]);
      }
    });
  }

}
