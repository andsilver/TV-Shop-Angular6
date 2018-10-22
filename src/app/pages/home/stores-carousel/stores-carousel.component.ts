import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-stores-carousel',
  templateUrl: './stores-carousel.component.html',
  styleUrls: ['./stores-carousel.component.scss']
})
export class StoresCarouselComponent implements OnInit, AfterViewInit {

  @Input() stores = [];

  public config: SwiperConfigInterface = { };

  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    console.log(this.stores);
    this.config = {
      slidesPerView: 2,
      spaceBetween: 5,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 60000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: 'slide',
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        600: {
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

}
