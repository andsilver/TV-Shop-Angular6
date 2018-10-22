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

  categories: Category[];
  brands = [];
  windowSize: string;

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
      this.categories = this.allCategories.filter( c => c.parentId === 0 );
      this.brands = this.allBrands;
      this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes = ', changes);
    if (changes.allCategories) {
        this.categories = this.allCategories.filter( c => c.parentId === 0 );
    }

    if (changes.allBrands) {
        this.brands = this.allBrands;
        console.log('this.brands = ', this.brands);
    }
  }

  subscribe() { }

}
