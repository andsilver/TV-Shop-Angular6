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
import * as BrandsActions from 'app/store/actions/brands.action';

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
  viewType = 'grid';
  viewCol = 25;
  counts = [12, 24, 36];
  count = 12;
  sortings = ['Relevantie', 'Best verkocht', 'Prijs laag-hoog', 'Prijs hoog-laag'];
  sort: any;
  products: Array<Product> = [];
  category_name: string;
  category_description: string;

  categoryId = 0;
  topParentCategoryId = 0;
  topParentCategory;

  brands = [];
  tempBrands = [];
  selectedBrands = [];
  priceFrom = 1;
  priceTo = 15000;
  colors = [ '#5C6BC0', '#66BB6A', '#EF5350', '#BA68C8', '#FF4081', '#9575CD', '#90CAF9', '#B2DFDB', '#DCE775',
                    '#FFD740', '#00E676', '#FBC02D', '#FF7043', '#F5F5F5', '#000000'];
  selectedColors = [];
  sizes = ['S', 'M', 'L', 'XL', '2XL', '32', '36', '38', '46', '52', '13.3\'', '15.4\'', '17\'', '21\'', '23.4\''];
  selectedSizes = [];
  page = 0;
  totalProducts = 0;
  emptyMessage = '';

  showMore = {
    show_more: {
      text: 'Toon meer',
      icon: 'keyboard_arrow_down',
      count: 6
    },
    show_less: {
      text: 'Toon minder',
      icon: 'keyboard_arrow_up',
      count: 9999
    }
  };

  filterLists = [];
  selectedFilterLists = [];
  tempFilterlist = [];
  popoverFilter: any;
  priceFilterOrder = 0;

  showMoreBrandsStatus;

  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private store: Store<State>) { }

  ngOnInit() {

    this.count = this.counts[0];
    this.sort  = this.sortings[0];

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }

    console.log(this.category);

    this.categoryId =  this.category ? this.category.id : 0;
    this.store.dispatch(new BrandsActions.GetBrands(this.categoryId));
    this.findTopCategoryId();

    this.Subscriptions = [
      this.store.select(state => state.keyword).subscribe(res => {
        this.keyword = res.keyword;
        this.filterChanged();
      }),
      this.store.select(state => state.brands).subscribe(res => this.tempBrands = res.manufacturer),
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

    this.viewType = 'list';
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
      this.brands = this.tempBrands;
    }

    this.products = res.products;
    this.category_name = res.category_name;
    this.category_description = res.category_description;
    this.filterLists = res['filterLists'] ? res['filterLists'] : 0;
    this.filterLists.forEach(filter => {
      filter['display'] = filter.values.length > 6 ? 'show_more' : 'show_less';
      filter['display'] = filter.values.some ( f => f.value_checked && filter.values.indexOf(f) > 5 ) ? 'show_less' : filter['display'];
    });

    const ft = this.filterLists.findIndex(filter => filter.option_name.toLowerCase() === 'beeldformaat');

    if ( ft > -1) {
      this.priceFilterOrder = ft;
    } else {
      this.priceFilterOrder = 0;
    }
    this.totalProducts = res.total;
    window.scrollTo(0, 0);
    if (!this.products.length) {
      this.emptyMessage = 'De opgegeven zoekopdracht heeft geen resultaten opgeleverd.';
    }
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
    const filt = {
      keyword: this.keyword,
      categoryId: this.categoryId,
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

  changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
    localStorage.setItem('viewType', viewType);
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
    this.router.navigate([event.permalink]);
  }

  selectBrand(brand) {
    const index = this.selectedBrands.indexOf(brand);
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
      if ( ind > -1 ) {
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
        children: [ valueId ]
      });
    }
    console.log(this.selectedFilterLists);
    this.filterChanged();
  }

  changeShowMore(filter) {
    filter.display = (filter.display === 'show_more') ? 'show_less' : 'show_more';
  }

  findTopCategoryId() {
    if (this.categoryId === 0) {
      this.topParentCategoryId = 0;
      return;
    }

    let parent = this.category;
    while ( parent.parentId !== 0 ) {
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

}
