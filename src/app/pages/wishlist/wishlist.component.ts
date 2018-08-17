import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(public appService:AppService) { }

  ngOnInit() { }

  public remove(product) {
    const index: number = this.appService.Data.wishList.indexOf(product);
    if (index !== -1) {
        this.appService.Data.wishList.splice(index, 1);
    }     
  }

  public clear(){
    this.appService.Data.wishList.length = 0;
  } 

  public addToCart(product){
    this.appService.addToCart(product);
  } 

}