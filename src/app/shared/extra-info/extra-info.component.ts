import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';

declare var imgix: any;

@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent implements OnInit {

  stores = [
    {
      name: 'Amsterdam',
      link: '/stores/amsterdam',
      img: 'store_images/amsterdam.png'
    },
    {
      name: 'Arnhem',
      link: '/stores/arnhem',
      img: 'store_images/arnhem.png'
    },
    {
      name: 'Breda',
      link: '/stores/breda',
      img: 'store_images/breda.png'
    },
    {
      name: 'Doesburg',
      link: '/stores/doesburg',
      img: 'store_images/doesburg.png'
    },
    {
      name: 'Doetinchem',
      link: '/stores/doetinchem',
      img: 'store_images/doetinchem.png'
    },
    {
      name: 'Eindhoven',
      link: '/stores/eindhoven',
      img: 'store_images/eindhoven-thumb.jpg',
      new: true
    },
    {
      name: 'Nijmegen',
      link: '/stores/nijmegen',
      img: 'store_images/nijmegen.png'
    },
    {
      name: 'Utrecht',
      link: '/stores/utrecht',
      img: 'store_images/PlatteTV_Utrecht_vierkant_Thumbnail_Samsung.jpg'
    }
  ];

  constructor(public appService: AppService) { }

  ngOnInit() {
    setTimeout(() => imgix.init(), 1);
  }

}
