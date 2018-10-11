import { Component, OnInit, OnDestroy, ViewChild, HostListener, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
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
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {

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
  count = 12;
  sortings = ['Relevantie', 'Best verkocht', 'Prijs laag-hoog', 'Prijs hoog-laag'];
  sort: any;
  products: Product[] = [];
  category_name: string;
  category_description: string;

  categoryId = 0;
  topParentCategoryId = 0;
  topParentCategory;

  brands = [];
  selectedBrands = [];
  priceFrom = 1;
  priceTo = 15000;
  page = 0;
  totalProducts = 0;
  emptyMessage = '';

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

  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<State>) { }

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

  ngAfterViewInit() {
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

    this.products = res.products;
    this.category_name = res.category_name;
    this.category_description = res.category_description.replace(/href="#"/g, ' ');
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
    this.priceFrom = 1;
    this.priceTo = 10000;
    this.sort = this.sortings[0];
  }

  filterChanged() {
    this.page = 1;
    this.getProducts();
  }

  getProducts() {
    this.emptyMessage = '';

    const _categoryId =
      (this.category.name === 'Buitenkansje' || this.category.name === 'Acties') ?
      this.category.name.toLowerCase() :
      this.categoryId;

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
    const categoryId = event.srcElement.parentElement.getAttribute('data-catid');
    const cate = this.categories.find(c => c.id === categoryId);
    if (cate) {
      this.router.navigate([cate.permalink]);
    }
  }

}
