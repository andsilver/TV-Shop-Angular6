import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Product } from 'app/app.models';
declare var imgix: any;
@Component({
  selector: 'app-extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent implements OnInit {

  shopping_items: Observable<Product[]>;

  constructor(public appService: AppService) { }

  ngOnInit() {
    setTimeout(() => {
      imgix.init()
    }, 1)
    this.shopping_items = of(this.appService.Data.cartList);
  }

}
