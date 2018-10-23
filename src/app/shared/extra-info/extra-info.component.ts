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

          // Replace icon to svg icons.
          if (this.contents.length > 2) {
            let content = this.contents[1].content;
            console.log('content = ', content);
            content = content.replace('<i class="far fa-comment"></i>', '<div class="contact_box_icon"><fa-icon [icon]="[\'far\', \'comment\']"></fa-icon></div>');
            this.contents[1].content = content;
          }
          // <div class="contact_box contact_chat_live">
          // <a onclick="LC_API.open_chat_window(); return false;" href="https://www.plattetv.nl/">
          // <div class="contact_box_icon">
          // <fa-icon [icon]="['far', 'comment']"></fa-icon>
          //     </div>
          //     <strong i18n>CHAT LIVE</strong>
          // <span i18n>Reply within 30 sec.</span>
          // </a>
          // </div>
          // <div class="contact_box contact_form">
          // <a href="https://www.plattetv.nl/extrainfo/contact-formulier-2557.html?popup=true" class="popupCMS">
          // <div class="contact_box_icon">
          // <fa-icon [icon]="['far','envelope']"></fa-icon>
          //     </div>
          //     <strong i18n>Insert Form</strong>
          // <span i18n>Reply within 10 min.</span>
          // </a>
          // </div>
          // <div class="contact_box contact_whatsapp">
          // <a href="https://api.whatsapp.com/send?phone=31633444433">
          // <div class="contact_box_icon">
          // <fa-icon [icon]="['fab', 'whatsapp']"></fa-icon>
          //     </div>
          //     <strong i18n>WHATSAPP US</strong>
          // <span i18n>Reply within 30 sec.</span>
          // </a>
          // </div>
          // <div class="contact_box contact_bel">
          // <a href="tel:0268454658">
          // <div class="contact_box_icon">
          // <fa-icon [icon]="['fas', 'phone']"></fa-icon>
          //     </div>
          //     <strong i18n>CALL 026-84 54 658</strong>
          // <span i18n>Direct reply</span>
          // </a>
          // </div>
      }),
    ];
  }

}
