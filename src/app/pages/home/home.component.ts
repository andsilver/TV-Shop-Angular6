import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from '../../app.models';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'Welkom in onze vernieuwde webwinkel!', subtitle: 'Nu nog meer bestelgemak', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Black Friday Deals', subtitle: 'Alleen bij PlatteTV', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Kerst Deals', subtitle: 'Alleen bij PlatteTV', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Zomer Deals', subtitle: 'Alleen bij PlatteTV', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Mega Deals', subtitle: 'Alleen bij PlatteTV', image: 'assets/images/carousel/banner5.jpg' }
  ];

  public brands = [];
  public banners = [];
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;


  constructor(public appService: AppService, private homeService: HomeService) { }

  ngOnInit() {
    this.featuredProducts = this.homeService.featuredProducts;
    this.banners = this.homeService.banners;
    this.brands = this.homeService.brands;
  }

  public onLinkClick(e) {
    this.getProducts(e.tab.textLabel.toLowerCase());
  }

  public getProducts(type) {
    if (type === 'featured' && !this.featuredProducts) {
      this.appService.getProducts('featured').subscribe(data => {
        this.featuredProducts = data.products;
      });
    }
    if (type === 'on sale' && !this.onSaleProducts) {
      this.appService.getProducts('on-sale').subscribe(data => {
        this.onSaleProducts = data.products;
      });
    }
    if (type === 'top rated' && !this.topRatedProducts) {
      this.appService.getProducts('top-rated').subscribe(data => {
        this.topRatedProducts = data.products;
      });
    }
    if (type === 'new arrivals' && !this.newArrivalsProducts) {
      this.appService.getProducts('new-arrivals').subscribe(data => {
        this.newArrivalsProducts = data.products;
      });
    }

  }

}
