import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
// import { Product } from '../../app.models';
import { AppSettings } from '../../app.settings';
import { Title } from '@angular/platform-browser';
// import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as KeywordActions from 'app/store/actions/keyword.action';

import * as data from 'assets/data/banners.json';
declare var imgix: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  slides = [
    {
      title: 'Welkom in onze vernieuwde webwinkel!',
      subtitle: 'Nu nog meer bestelgemak',
      image: `//${imgix.config.host}/images/carousel/banner1.jpg?auto=compress&w=657`
    },
    {
      title: 'Black Friday Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner2.jpg?auto=compress&w=657`
    },
    {
      title: 'Kerst Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner3.jpg?auto=compress&w=657`
    },
    {
      title: 'Zomer Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner4.jpg?auto=compress&w=657`
    },
    {
      title: 'Mega Deals',
      subtitle: 'Alleen bij PlatteTV',
      image: `//${imgix.config.host}/images/carousel/banner5.jpg?auto=compress&w=657`
    }
  ];

  // brands = [];
  banners = [];

  // subscription: Subscription;

  // featuredProducts: Array<Product>;
  // onSaleProducts: Array<Product>;
  // topRatedProducts: Array<Product>;
  // newArrivalsProducts: Array<Product>;
  // products: Array<Product>;

  windowSize: string;


  constructor(public appService: AppService, private settings: AppSettings, private title: Title, private store: Store<State>) { }

  ngOnInit() {
    // forkJoin([
    //     this.appService.getBanners(),
    //     this.appService.getBrandsByCategoryId(0),
    //     this.appService.getProducts('featured'),
    //     this.appService.getProducts('sale'),
    //     this.appService.getProducts('top_rated'),
    //     this.appService.getProducts('new_arrivals')
    //   ])
    //   .subscribe(res => {
    //     this.brands = res[1].manufacturer;
    //     this.featuredProducts = res[2].products;
    //     this.onSaleProducts = res[3].products;
    //     this.topRatedProducts = res[4].products;
    //     this.newArrivalsProducts = res[5].products;
    //     this.products = this.onSaleProducts;
    //   });
    // this.subscription = this.appService.getBrandsByCategoryId(0).subscribe( res => {
    //   this.brands = res.manufacturer;
    // });
    this.banners = data['banners'];
    this.title.setTitle(this.settings.settings.name);
    this.store.dispatch(new KeywordActions.SetKeyword(''));

    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  // onLinkClick(e) {
  //   this.getProducts(e.tab.textLabel.toLowerCase());
  // }

  // getProducts(type) {
  //   // if (type === 'featured') {
  //   //   this.products = this.featuredProducts;
  //   // }
  //   if (type === 'aanbiedingen') {
  //     this.products = this.onSaleProducts;
  //   }
  //   if (type === 'best beoordeeld') {
  //     this.products = this.topRatedProducts;
  //   }
  //   if (type === 'nieuw') {
  //     this.products = this.newArrivalsProducts;
  //   }
  // }

  @HostListener('window:resize')
  public onWindowResize(): void {
    this.windowSize = (window.innerWidth < 960) ? 'lt-md' : 'gt-md';
  }

}
