import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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

  categories = [
    {
      name: 'OLED TV',
      link: '/oled-tv',
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
      link: '/8k-ultra-hd-tv'
    },
    {
      name: 'Alle TV\'s',
      link: '/alle-tv-s',
      i18n: 'Alle TV\'s'
    },
    {
      name: 'Soundbars',
      link: '/soundbars'
    }
  ];

  brands = [
    {
      name: 'Samsung',
      link: 'https://www.plattetv.nl/leverancier/samsung-18.html'
    },
    {
      name: 'LG',
      link: 'https://www.plattetv.nl/leverancier/lg-19.html'
    },
    {
      name: 'Sony',
      link: 'https://www.plattetv.nl/leverancier/sony-10.html'
    },
    {
      name: 'Philips',
      link: 'https://www.plattetv.nl/leverancier/philips-9.html'
    },
    {
      name: 'Panasonic',
      link: 'https://www.plattetv.nl/leverancier/panasonic-5.html'
    },
    {
      name: 'Sonos',
      link: 'https://www.plattetv.nl/leverancier/sonos-190.html'
    },
    {
      name: 'HEOS',
      link: 'https://www.plattetv.nl/leverancier/heos-by-denon-207.html'
    },
    {
      name: 'Denon',
      link: 'https://www.plattetv.nl/leverancier/denon-203.html'
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

  ngOnInit() { }

  subscribe() { }

}
