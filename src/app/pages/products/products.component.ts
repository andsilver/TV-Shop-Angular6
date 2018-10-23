import {Component, OnInit, OnDestroy, ViewChild, HostListener, Input, ViewEncapsulation} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as ProductsActions from 'app/store/actions/products.action';
import * as FiltersListActions from 'app/store/actions/filters-list.action';

import { OutdoorOpportunityDialogComponent } from './outdoor-opportunity-dialog/outdoor-opportunity-dialog.component';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from '../../app.models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav')
  sidenav: any;

  @Input()
  category: Category;

  @Input()
  categories: Category[] = [];

  private Subscriptions: Subscription[];

  priceToChanged = new Subject();
  priceFromChanged = new Subject();

  isFirst = true;
  viewLoaded = false;
  keyword: string;
  sidenavOpen = true;
  viewCol = 25;
  counts = [12, 24, 36];
  sortings = ['Relevantie', 'Best verkocht', 'Prijs laag-hoog', 'Prijs hoog-laag'];
  products: Product[] = [];
  category_name: string;
  category_description: string;
  banners: any;

  categoryId = 0;
  topParentCategoryId = 0;
  topParentCategory;

  brands = [];

  emptyMessage = '';
  isTop5 = false;

  showMore = {
    show_more: {
      text: 'Toon meer',
      icon: 'caret-down',
      count: 6
    },
    show_less: {
      text: 'Toon minder',
      icon: 'caret-up',
      count: 9999
    }
  };

  filterLists = [];
  prevFiltersList = [];
  selectedFilterLists = [];
  brandsFilter = {
    display: ''
  };
  popoverFilter: any;
  priceFilterOrder = 0;

  sort: any;
  count = 12;
  selectedBrands = [];
  priceFrom = 1;
  priceTo = 15000;
  page = 0;
  totalProducts = 0;

  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<State>,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {

    this.initFilter();
    this.count = this.counts[0];
    this.store.dispatch(new FiltersListActions.RemoveFilterList);

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }

    this.categoryId = this.category ? this.category.id : 0;
    this.findTopCategoryId();

    this.Subscriptions = [
      this.store.select(state => state.keyword).subscribe(res => {
        this.keyword = res.keyword;
        this.filterChanged();
      }),
      this.store.select(state => state.filtersList).subscribe(res => this.prevFiltersList = res.filtersList),
      this.store.select(state => state.products).subscribe( resp => this.setProducts(resp)),
      this.priceFromChanged
        .pipe(
          debounceTime(1000),
          distinctUntilChanged()
        )
        .subscribe((event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            return;
          }
          this.priceFrom = event.target['value'];
          this.filterChanged();
        }),
      this.priceToChanged
        .pipe(
          debounceTime(1000),
          distinctUntilChanged()
        )
        .subscribe((event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            return;
          }
          this.priceTo = event.target['value'];
          this.filterChanged();
        })
    ];

    setTimeout(() => {
      imgix.init();
    }, 1);
  }

  ngOnDestroy() {
    this.Subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  setProducts(res) {
    if (this.isFirst) {
      this.isFirst = false;
      return;
    } else {
      this.viewLoaded = true;
    }
    this.isTop5 = res.category_name.indexOf('Top 5') > -1 ? true : false;
    this.products = res.products;

    if (res && res.banners) {
        this.banners = res.banners;
        setTimeout(() => imgix.init(), 1);
    }

    this.category_name = res.category_name;
    if ( res && res.category_description) {
      this.category_description = res.category_description.replace(/href="#"/g, ' ');
    }
    this.brands = res['filterLists'] ? res['filterLists']['manufacturers'] : [];
    this.filterLists = res['filterLists'] && res['filterLists']['options'] ? res['filterLists']['options'] : [];

    for ( let i = 0; i < this.filterLists.length; i++) {
      if ( this.prevFiltersList ) {
        this.filterLists[i]['display'] = this.prevFiltersList['options'][i]['display'];
      } else {
        this.filterLists[i]['display'] = this.filterLists[i].fold ? 'show_less' : 'show_more';
      }
    }

    if (this.prevFiltersList) {
      this.brandsFilter['display'] = this.prevFiltersList['manufacturers']['display'];
    } else {
      this.brandsFilter['display'] = 'show_less';
    }

    const ft = this.filterLists.findIndex(filter => filter.option_name.toLowerCase() === 'beeldformaat');

    if ( ft > -1) {
      this.priceFilterOrder = ft;
    } else {
      this.priceFilterOrder = 0;
    }

    this.totalProducts = res.total;

    window.scrollTo(0, 0);

    if (!this.products || !this.products.length) {
      this.emptyMessage = 'De opgegeven zoekopdracht heeft geen resultaten opgeleverd.';
    }
    setTimeout(() => imgix.init(), 1);
  }

  initFilter() {
    this.selectedBrands = [];
    this.selectedFilterLists = [];
    this.sort = this.sortings[0];

    const f = this.route.snapshot.queryParamMap['params'];
    console.log(f);

    const priceRange = f['pr'];
    this.priceFrom = priceRange ? Number(priceRange.split('-')[0]) : 1;
    this.priceTo = priceRange ? Number(priceRange.split('-')[1]) : 10000;
    this.sort = f['so'] ? this.sortings[Number(f['so'])] : this.sortings[0];

    const brands = f['merk'] ? f['merk'].split('|') : [];
    brands.forEach(b => this.selectedBrands.push({name: b.split(':')[0], id: Number(b.split(':')[1])}));

    const options = f['op'] ? f['op'].split('|') : [];
    options.forEach(o => {
      const v = o.split(':');
      this.selectedFilterLists.push({
        id: Number(v[0]),
        children: v[1].split(';').map(c => Number(c))
      });
    });

    this.page = f['page'] ? Number(f['page']) : 1;
  }

  filterChanged() {
    this.page = 1;
    this.getProducts();
  }

  getProducts() {
    this.emptyMessage = '';

    const filt = {
      keyword: this.keyword,
      categoryPath: this.category.permalink,
      fromPrice: this.priceFrom,
      toPrice: this.priceTo,
      filterAttributes: {
        brands: this.selectedBrands.map(b => b.name)
      },
      sort: this.sort,
      limit: this.count,
      page: this.page
    };

    this.replaceUrl();

    if (this.router.url.indexOf('leverancier') > -1) {
      filt['manufacturersPath'] = this.router.url;
    }

    this.selectedFilterLists.forEach(f => {
      filt.filterAttributes[f.id] = f.children;
    });

    this.store.dispatch(new ProductsActions.FilterProducts(filt));
  }

  changeCount(count) {
    this.count = count;
    this.filterChanged();
  }

  changeSorting(sort) {
    this.sort = sort;
    this.filterChanged();
  }

  openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(p => {
      if (p) {
        this.router.navigate([p.permalink]);
      }
    });
  }

  onPageChanged(event) {
    this.page = event;
    this.getProducts();
  }

  onChangeCategory(event) {
    console.log(event.permalink);
    this.router.navigate([event.permalink]);
  }

  selectBrand(brand) {
    const index = this.selectedBrands.findIndex(b => brand.name === b.name);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }
    this.filterChanged();
  }

  selectFilter(optionId, valueId) {
    const option = this.selectedFilterLists.find(filt => filt.id === optionId);
    if (option) {
      const ind = option.children.indexOf(valueId);
      if (ind > -1) {
        option.children.splice(ind, 1);
        if (option.children.length === 0) {
          this.selectedFilterLists.splice(this.selectedFilterLists.indexOf(option), 1);
        }
      } else {
        option.children.push(valueId);
      }
    } else {
      this.selectedFilterLists.push({
        id: optionId,
        children: [valueId]
      });
    }

    this.filterChanged();
  }

  changeShowMore(filter) {
    filter.display = (filter.display === 'show_more') ? 'show_less' : 'show_more';

    this.store.dispatch(new FiltersListActions.SaveFilterList(
      {
        manufacturers: this.brandsFilter,
        options: this.filterLists.map(f => {
          return {
            display: f.display
          };
        })
      }));
  }

  findTopCategoryId() {
    if (this.categoryId === 0) {
      this.topParentCategoryId = 0;
      return;
    }

    let parent = this.category;
    while (parent.parentId !== 0) {
      parent = this.categories.find(c => c.id === parent.parentId);
    }

    this.topParentCategory = parent;
    this.topParentCategoryId = parent.id;
  }

  checkStockIndicator(product) {
    if (product) {
      return product.stockIndicator.indexOf('Vraag naar levertijd') > -1;
    }
    return false;
  }

  openDemoUnit(product) {
    const dialogRef = this.dialog.open(OutdoorOpportunityDialogComponent, {
      data: product,
      panelClass: 'popup-demo-unit'
    });
    dialogRef.afterClosed().subscribe(res => {

    });
  }

  navigateToCategory(event) {
    console.log(event);
    const link = event.srcElement.parentElement.getAttribute('data-routerlink');
    if (link) {
      this.router.navigate([link]);
    }
  }

  replaceUrl() {

    const query: string[] = [];

    if (this.sortings.indexOf(this.sort)) {
      query.push(`so=${this.sortings.indexOf(this.sort)}`);
    }

    if (this.selectedBrands.length) {
      const params = this.selectedBrands.map(b => `${b.name}:${b.id}`);
      query.push(`merk=${params.join('|')}`);
    }

    if (this.priceFrom !== 1 && this.priceTo !== 15000) {
      query.push(`pr=${this.priceFrom}-${this.priceTo}`);
    }

    if (this.selectedFilterLists.length) {
      const params = this.selectedFilterLists.map((o, index) => `${o.id}:${o.children.join(';')}`);
      query.push(`op=${params.join('|')}`);
    }

    if (this.page !== 1) {
      query.push(`page=${this.page}`);
    }

    const url = query.length ? `?${query.join('&')}` : '';

    console.log(url);

    this.location.replaceState(`${this.router.url.split('?')[0]}${url}`);
  }

}
