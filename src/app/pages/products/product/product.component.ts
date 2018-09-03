import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { AppService } from '../../../app.service';
import { Product } from '../../../app.models';
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';

import { Store } from '@ngrx/store';
import { State } from 'app/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  private sub: any;
  public config: SwiperConfigInterface = {};
  public product: Product;
  public image: any;
  public zoomImage: any;
  public selectedImage: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;

  constructor(
    public santitizer: DomSanitizer,
    private store: Store<State>,
    public appService: AppService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder) {  }

  ngOnInit() {
    this.sub = this.store.select(state => state.product).subscribe(res => {
      this.product = null;
      this.product = res.product;
      this.selectedImage = this.product.images[0];
      this.image = this.product.images[0].medium;
      this.zoomImage = this.product.images[0].big;
      setTimeout(() => {
        this.config.observer = true;
        // this.directiveRef.setIndex(0);
      });
    });
    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });
    this.getRelatedProducts();
  }

  ngAfterViewInit() {
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    };
  }

  public getProductById(id) {
    this.appService.getProductById(id).subscribe(data => {
      this.product = data;
      // console.log(data);
      this.selectedImage = data.images[0];
      this.image = data.images[0].medium;
      this.zoomImage = data.images[0].big;
      setTimeout(() => {
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
  }

  public getRelatedProducts() {
    this.appService.getProducts('related').subscribe(data => {
      this.relatedProducts = data.products;
    });
  }

  public selectImage(image) {
    this.selectedImage = image;
    this.image = image.medium;
    this.zoomImage = image.big;
    console.log(this.selectedImage);
  }

  public onMouseMove(e) {
    if (window.innerWidth >= 1280) {
      const image = e.currentTarget;
      let offsetX, offsetY, x, y, zoomer;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX / image.offsetWidth * 100;
      y = offsetY / image.offsetHeight * 100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if (zoomer) {
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = 'block';
        zoomer.style.height = image.height * 2 + 'px';
        zoomer.style.width = image.width * 2 + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  public openZoomViewer() {
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      // email sent
    }
  }

  public attributeSelected(index, event) {
    this.product.attributes[index]['selected'] = event.value;
  }
}
