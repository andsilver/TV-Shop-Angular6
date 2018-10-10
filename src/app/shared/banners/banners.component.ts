import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  @Input() banners: Array<any> = [];

  constructor() { }

  ngOnInit() { }

  public getBanner(index) {
    return this.banners[index];
  }

  public getBgImage(index) {
    return index != null ? `//${imgix.config.host}/${this.banners[index].image}` : 'https://via.placeholder.com/600x400/ff0000/fff/';
  }

}
