import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer') zoomViewer;
  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;

  constructor(public appService:AppService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, public formBuilder: FormBuilder) {  }

  ngOnInit() {      
    this.sub = this.activatedRoute.params.subscribe(params => { 
      this.getProductById(params['id']); 
    }); 
    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    this.getRelatedProducts();    
  }

  ngAfterViewInit(){
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
    }
  }

  public getProductById(id){
    this.appService.getProductById(id).subscribe(data=>{
      this.product = data;
      this.image = data.images[0].medium;
      this.zoomImage = data.images[0].big;
      setTimeout(() => { 
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
  }

  public getRelatedProducts(){
    this.appService.getProducts('related').subscribe(data => {
      this.relatedProducts = data;
    })
  }

  public selectImage(image){
    this.image = image.medium;
    this.zoomImage = image.big;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }

}