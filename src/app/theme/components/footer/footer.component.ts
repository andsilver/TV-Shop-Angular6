import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Category } from 'app/app.models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnChanges {

  @Input() allCategories: Category[];
  @Input() allBrands: Array<any>;
  @Input() windowSize: string;

  categories: Category[];
  brands = [];

  popular_categories = [
      {
          name: 'OLED TV',
          link: '/oled-tv'
      },
      {
          name: '4K UHD TV',
          link: '/4k-uhd-tv'
      },
      {
          name: 'LED TV',
          link: '/led-tv'
      },
      {
          name: 'QLED TV',
          link: '/qled-tv'
      },
      {
          name: 'Smart TV',
          link: '/smart-tv'
      },
      {
          name: '8K Ultra HD TV',
          link: '/8k-uhd-tv'
      },
      {
          name: 'Alle TV\'s',
          link: '/alle-tv-s'
      },
      {
          name: 'Soundbars',
          link: '/audio/geluid-voor-uw-tv/soundbars'
      }
  ];
  popular_brands = [
      {
          name: 'Samsung',
          link: '/leverancier/samsung'
      },
      {
          name: 'LG',
          link: '/leverancier/lg'
      },
      {
          name: 'Sony',
          link: '/leverancier/sony'
      },
      {
          name: 'Philips',
          link: '/leverancier/philips'
      },
      {
          name: 'Panasonic',
          link: '/leverancier/panasonic'
      },
      {
          name: 'Sonos',
          link: '/leverancier/sonos'
      },
      {
          name: 'HEOS',
          link: '/leverancier/heos-by-denon'
      },
      {
          name: 'Denon',
          link: '/leverancier/denon'
      }
  ];

  stores = [
    {
      name: 'Amsterdam',
      link: ['/stores', 'amsterdam']
    },
    {
      name: 'Arnhem',
      link: ['/stores', 'arnhem']
    },
    {
      name: 'Breda',
      link: ['/stores', 'breda'],
    },
    {
      name: 'Doesburg',
      link: ['/stores', 'doesburg'],
    },
    {
      name: 'Doetinchem',
      link: ['/stores', 'doetinchem'],
    },
    {
      name: 'Eindhoven',
      link: ['/stores', 'eindhoven'],
    },
    {
      name: 'Nijmegen',
      link: ['/stores', 'nijmegen'],
    },
    {
      name: 'Utrecht',
      link: ['/stores', 'utrecht']
    }
  ];

  payments = [
    {
      img: '/assets/images/others/icons_footer_ideal.png',
      alt: 'iDEAL'
    },
    {
      img: '/assets/images/others/icons_footer_bancontact.png',
      alt: 'Bancontact'
    },
    {
      img: '/assets/images/others/icons_footer_mastercard.png',
      alt: 'MasterCard'
    },
    {
      img: '/assets/images/others/icons_footer_visa.png',
      alt: 'VISA'
    },
    {
      img: '/assets/images/others/icons_footer_findio.png',
      alt: 'Findio'
    },
    {
      img: '/assets/images/others/icons_footer_postnl.png',
      alt: 'Postnl'
    },
    {
      img: '/assets/images/others/icons_footer_q.png',
      alt: 'Q'
    }
  ];

  constructor() { }

  ngOnInit() {
      if (this.allCategories) {
          this.categories = this.allCategories.filter( c => c.parentId === 0 );
      }

      if (this.allBrands) {
          this.brands = this.allBrands;
      }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allCategories) {
        this.categories = this.allCategories.filter( c => c.parentId === 0 );
    }

    if (changes.allBrands) {
        this.brands = this.allBrands;
    }

    if (changes.windowSize) {
        // this.windowSize = changes['windowSize'];
    }
  }

  subscribe() { }

}
