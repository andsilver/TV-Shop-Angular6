import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  public brands = [];
  public banners = [];
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;


  constructor(public appService:AppService) { }

  ngOnInit() {
    this.getBanners();
    this.getProducts("featured");
    this.getBrands();
  }

  public onLinkClick(e){
    this.getProducts(e.tab.textLabel.toLowerCase()); 
  }

  public getProducts(type){
    if(type == "featured" && !this.featuredProducts){
      this.appService.getProducts("featured").subscribe(data=>{
        this.featuredProducts = data;      
      }) 
    }
    if(type == "on sale" && !this.onSaleProducts){
      this.appService.getProducts("on-sale").subscribe(data=>{
        this.onSaleProducts = data;      
      })
    }
    if(type == "top rated" && !this.topRatedProducts){
      this.appService.getProducts("top-rated").subscribe(data=>{
        this.topRatedProducts = data;      
      })
    }
    if(type == "new arrivals" && !this.newArrivalsProducts){
      this.appService.getProducts("new-arrivals").subscribe(data=>{
        this.newArrivalsProducts = data;      
      })
    }
   
  }

  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

}
