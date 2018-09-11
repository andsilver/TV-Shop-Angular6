import { Component, OnInit, OnChanges, OnDestroy, ViewChild, HostListener, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'app/store';
import * as ProductsActions from 'app/store/actions/products.action';
import * as BrandsActions from 'app/store/actions/brands.action';

import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from '../../app.models';
import { ErrorHandlerService } from 'app/services';

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

  categoryId = 0;
  topParentCategoryId = 0;
  topParentCategory;

  brands = [];
  tempBrands = [];
  selectedBrands = [];
  priceFrom = 1;
  priceTo = 10000;
  colors = [ '#5C6BC0', '#66BB6A', '#EF5350', '#BA68C8', '#FF4081', '#9575CD', '#90CAF9', '#B2DFDB', '#DCE775',
                    '#FFD740', '#00E676', '#FBC02D', '#FF7043', '#F5F5F5', '#000000'];
  selectedColors = [];
  sizes = ['S', 'M', 'L', 'XL', '2XL', '32', '36', '38', '46', '52', '13.3\'', '15.4\'', '17\'', '21\'', '23.4\''];
  selectedSizes = [];
  page = 0;
  totalProducts = 0;
  emptyMessage = '';

  showMoreBrandsType = {
    show_more: {
      text: 'Toon meer',
      icon: 'keyboard_arrow_down',
      count: 10
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

  showMoreBrandsStatus;

  constructor(private activatedRoute: ActivatedRoute,
              public appService: AppService,
              public errorHandlerService: ErrorHandlerService,
              public dialog: MatDialog,
              private router: Router,
              private store: Store<State>) { }

  ngOnInit() {

    this.count = this.counts[0];
    this.sort  = this.sortings[0];
    this.showMoreBrandsStatus = this.showMoreBrandsType.show_more;

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }

    this.categoryId =  this.category ? this.category.id : 0;
    this.store.dispatch(new BrandsActions.GetBrands(this.categoryId));
    this.findTopCategoryId();

    this.Subscriptions = [
      this.store.select(state => state.keyword).subscribe(res => {
        this.keyword = res.keyword;
        this.filterChanged();
      }),
      this.store.select(state => state.brands).subscribe(res => this.tempBrands = res.manufacturer),
      this.store.select(state => state.products).subscribe( resp => this.setProducts(resp))
    ];

    this.viewType = localStorage.getItem('viewType') ? localStorage.getItem('viewType') : 'list';
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
    this.filterLists = res['filterLists'];
    this.totalProducts = res.total;
    window.scrollTo(0, 0);
    if (!this.products.length) {
      this.emptyMessage = 'De opgegeven zoekopdracht heeft geen resultaten opgeleverd.';
    }
  }

  initFilter() {
    this.selectedBrands = [];
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
        if (option.children.length === 0){
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

  changeShowMoreBrands() {
    this.showMoreBrandsStatus
      = (this.showMoreBrandsStatus === this.showMoreBrandsType.show_more)
      ? this.showMoreBrandsType.show_less
      : this.showMoreBrandsType.show_more;
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
