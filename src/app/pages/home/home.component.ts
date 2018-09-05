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

  public products: Array<Product>;


  constructor(public appService: AppService, private homeService: HomeService) { }

  ngOnInit() {
    this.featuredProducts = this.homeService.featuredProducts;
    this.onSaleProducts = this.homeService.onSaleProducts;
    this.topRatedProducts = this.homeService.topRatedProducts;
    this.newArrivalsProducts = this.homeService.newArrivalsProducts;
    this.banners = this.homeService.banners;
    this.brands = this.homeService.brands;

    this.products = this.onSaleProducts;

    console.log(this.newArrivalsProducts);
  }

  public onLinkClick(e) {
    this.getProducts(e.tab.textLabel.toLowerCase());
  }

  public getProducts(type) {
    // if (type === 'featured') {
    //   this.products = this.featuredProducts;
    // }
    if (type === 'aanbiedingen') {
      this.products = this.onSaleProducts;
    }
    if (type === 'best beoordeeld') {
      this.products = this.topRatedProducts;
    }
    if (type === 'nieuw') {
      this.products = this.newArrivalsProducts;
    }
  }

}
