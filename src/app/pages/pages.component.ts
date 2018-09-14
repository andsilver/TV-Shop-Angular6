import { Component, OnInit, HostListener, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

import { AppService } from '../app.service';
import { Category } from '../app.models';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { SidenavMenu } from '../theme/components/sidenav-menu/sidenav-menu.model';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as KeywordActions from 'app/store/actions/keyword.action';
import * as CategoriesActions from 'app/store/actions/categories.action';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ SidenavMenuService ]
})
export class PagesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav')
  sidenav: any;

  showBackToTop = false;
  categories: Category[] = [];
  category: Category;
  sidenavMenuItems: Array<any> = [];
  keyword = '';
  searchTerm = new Subject();

  private subscriptions: Subscription[] = [];

  constructor(public appService: AppService,
              public sidenavMenuService: SidenavMenuService,
              public router: Router,
              public store: Store<State>) {
  }

  ngOnInit() {
    this.subscriptions.push(
      // this.store.select(state => state.categories ).subscribe(res => {
      //   this.categories = res.categories;
      //   this.category = res.categories[0];
      //   this.sidenavMenuItems = this.categories.map(c =>
      //       new SidenavMenu(c.id, c.name, `${c.permalink}`, null, null, c.hasSubCategory, c.parentId));
      // })
      this.appService.getCategories().subscribe(res => {
        this.categories = res;
        this.category = res[0];
        this.store.dispatch(new CategoriesActions.SuccessGetCategories(res));
        this.sidenavMenuItems = this.categories.map(c =>
            new SidenavMenu(c.id, c.name, `${c.permalink}`, null, null, c.hasSubCategory, c.parentId));
      })
    );

    this.searchTerm
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(word => {
        this.search();
      });
    // this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.sidenav.close();
        }
      })
    );

    this.subscriptions.push(
      this.store.select(state => state.keyword).subscribe(data => setTimeout(() => this.keyword = data.keyword, 500))
    );
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  changeCategory(event) {
    if (window.innerWidth < 960) {
      this.stopClickPropagate(event);
    }
  }

  remove(product) {
      const index: number = this.appService.Data.cartList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.cartList.splice(index, 1);
          this.appService.Data.totalPrice = this.appService.Data.totalPrice - product.newPrice;
      }
  }

  search() {
    if (!this.categories.some(c => c.permalink === `${this.router.url}/`)) {
      this.router.navigate(['/products']);
    }
    this.store.dispatch(new KeywordActions.SetKeyword(this.keyword));
  }

  clear() {
    this.appService.Data.cartList.length = 0;
  }

  stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  scrollToTop() {
    const scrollDuration = 200;
    const scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    const scrollInterval = setInterval(() => {
      if (window.pageYOffset !== 0) {
         window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => window.scrollTo(0, 0));
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
  }

  closeSubMenus() {
    if (window.innerWidth < 960) {
      this.sidenavMenuService.closeAllSubMenus();
    }
  }

  getAttributeName(product, id, value) {
    return product.attributes[id].values.find(v => v.products_options_values_id === value).products_options_values_name;
  }

}
