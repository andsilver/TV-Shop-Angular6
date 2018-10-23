import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { State } from 'app/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent implements OnInit {

  stores = [
    {
      name: 'Amsterdam',
      link: ['/stores', 'amsterdam'],
      img: 'store_images/amsterdam.png'
    },
    {
      name: 'Arnhem',
      link: ['/stores', 'arnhem'],
      img: 'store_images/arnhem.png'
    },
    {
      name: 'Breda',
      link: ['/stores', 'breda'],
      img: 'store_images/breda.png'
    },
    {
      name: 'Doesburg',
      link: ['/stores', 'doesburg'],
      img: 'store_images/doesburg.png'
    },
    {
      name: 'Doetinchem',
      link: ['/stores', 'doetinchem'],
      img: 'store_images/doetinchem.png'
    },
    {
      name: 'Eindhoven',
      link: ['/stores', 'eindhoven'],
      img: 'store_images/eindhoven-thumb.jpg',
      new: true
    },
    {
      name: 'Nijmegen',
      link: ['/stores', 'nijmegen'],
      img: 'store_images/nijmegen.png'
    },
    {
      name: 'Utrecht',
      link: ['/stores', 'utrecht'],
      img: 'store_images/PlatteTV_Utrecht_vierkant_Thumbnail_Samsung.jpg'
    }
  ];

  contents = [];
  subscriptions = [];

  cart = null;

  constructor(public appService: AppService, private store: Store<State>) { }

  ngOnInit() {
    setTimeout(() => imgix.init(), 1);
    this.subscriptions = [
      this.store.select(state => state.cart).subscribe(res => {
        if (!res.CartId) {
          this.cart = null;
          return;
        }
        this.appService.getCartDetails(res.CartId).subscribe(re => {
          this.cart = re;
          console.log(re);
        });
      }),

      this.appService.getOpenStores().subscribe(res => {
          this.contents = res;
      }),
    ];
  }

}
