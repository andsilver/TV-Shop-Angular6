import { Component, OnInit, OnChanges, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
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
export class ProductComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('zoomViewer')
  zoomViewer;

  @ViewChild(SwiperDirective)
  directiveRef: SwiperDirective;

  @Input()
  product: Product;

  public config: SwiperConfigInterface = {};
  public image: any;
  public zoomImage: any;
  public selectedImage: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;
  public subscription: Subscription;

  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private router: Router,
    private store: Store<State>) {}

  ngOnInit() {
    this.subscription = this.store.select(state => state.products).subscribe(data => {
      this.relatedProducts = data.products;
    });

    this.form = this.formBuilder.group({
      'review': [null, Validators.required],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    });
  }

  ngOnChanges() {

    if (!this.product.id) {
      this.product = null;
      this.router.navigate(['/404']);
      return;
    }

    this.selectImage(this.product.images[0]);
    setTimeout(() => {
      this.config.observer = true;
      // this.directiveRef.setIndex(0);
    });
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
          slidesPerView: 3
        }
      }
    };
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
        zoomer.style.height = image.height * 1.5 + 'px';
        zoomer.style.width = image.width * 1.5 + 'px';
        zoomer.style.backgroundImage = `url("${this.zoomImage}")`;
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
    this.subscription.unsubscribe();
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
