import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  
  constructor(public appService:AppService) { }

  ngOnInit() { }

  public remove(product) {
      const index: number = this.appService.Data.compareList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.compareList.splice(index, 1);
      }        
  }

  public clear(){
    this.appService.Data.compareList.length = 0;
  }

  public addToCart(product){
    this.appService.addToCart(product);
  }
}
