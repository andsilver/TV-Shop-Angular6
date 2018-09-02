import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State } from 'app/store';

import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from '../../app.models';
import { FilterService } from 'app/services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen = true;
  private Subscriptions: Subscription[];
  public viewType = 'grid';
  public viewCol = 25;
  public counts = [12, 24, 36];
  public count: number;
  public sortings = ['Relevantie', 'Best verkocht', 'Prijs laag-hoog', 'Prijs hoog-laag'];
  public sort: any;
  public products: Array<Product> = [];
  public categories: Category[];
  public categoryId = 0;
  public category;
  public topParentCategoryId = 0;
  public topParentCategory;
  public brands = [];
  public selectedBrands = [];
  public priceFrom = 1;
  public priceTo = 10000;
  public colors = [ '#5C6BC0', '#66BB6A', '#EF5350', '#BA68C8', '#FF4081', '#9575CD', '#90CAF9', '#B2DFDB', '#DCE775',
                    '#FFD740', '#00E676', '#FBC02D', '#FF7043', '#F5F5F5', '#000000'];
  public selectedColors = [];
  public sizes = ['S', 'M', 'L', 'XL', '2XL', '32', '36', '38', '46', '52', '13.3\'', '15.4\'', '17\'', '21\'', '23.4\''];
  public selectedSizes = [];
  public page = 0;
  public totalProducts = 0;

  public showMoreBrandsType = {
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

  public showMoreBrandsStatus;

  constructor(private activatedRoute: ActivatedRoute,
              public appService: AppService,
              public dialog: MatDialog,
              private router: Router,
              private filter: FilterService,
              private store: Store<State>) { }

  ngOnInit() {

    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.showMoreBrandsStatus = this.showMoreBrandsType.show_more;

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }

    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }

    this.Subscriptions = [
      this.filter.searchPerformed.subscribe(() => this.filterChanged()),
      this.store.select(state => state.products).subscribe( res => this.setProducts(res)),
      this.store.select(state => state.categories)
        .pipe(
          switchMap(res => {
            this.categories = res.categories;
            return this.activatedRoute.paramMap;
          })
        )
        .subscribe( params => {
            const categoryName = params.get('name');
            this.category = this.categories.find(c => c.name.toLowerCase() === categoryName);
            this.categoryId =  this.category ? this.category.id : 0;
            this.findTopCategoryId();
            this.getBrands();
            this.initFilter();
            this.filterChanged();
        })
      ];
  }

  ngOnDestroy() {
    this.Subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public getBrands() {
    this.appService.getBrandsByCategoryId(this.categoryId)
      .subscribe(res => {
        console.log(res);
        this.brands = res.manufacturer;
      });
  }

  public setProducts(res) {
    this.products = res.products;
    this.totalProducts = res.total;
  }

  public getProducts() {
    const filter = {
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
    this.filter.runFilter(filter);
  }

  public changeCount(count) {
    this.count = count;
    this.filterChanged();
  }

  public changeSorting(sort) {
    this.sort = sort;
    this.filterChanged();
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(p => {
      if (p) {
        this.router.navigate(['/products', p.id, p.name]);
      }
    });
  }

  public onPageChanged(event) {
      this.page = event;
      this.getProducts();
      window.scrollTo(0, 0);
  }

  public onChangeCategory(event) {
    if (event.target) {
      this.router.navigate(['/products', event.target.innerText.toLowerCase()]);
    }
  }

  public selectSize(size) {
    const index = this.selectedSizes.indexOf(size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }
    this.filterChanged();
  }

  public selectColor(color) {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    this.filterChanged();
  }

  public selectBrand(brand) {
    const index = this.selectedBrands.indexOf(brand);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }
    this.filterChanged();
  }

  public filterChanged() {
    this.page = 1;
    this.getProducts();
  }

  public changeShowMoreBrands() {
    this.showMoreBrandsStatus
      = (this.showMoreBrandsStatus === this.showMoreBrandsType.show_more)
      ? this.showMoreBrandsType.show_less
      : this.showMoreBrandsType.show_more;
  }

  public findTopCategoryId() {

    if (this.categoryId === 0) {
      this.topParentCategoryId = 0;
      return;
    }

    let parent = this.category;
    while ( parent.parentId !== 0 ) {
      parent = this.categories.find(c => c.id === parent.parentId);
    }

    console.log(parent.id);

    this.topParentCategory = parent;
    this.topParentCategoryId = parent.id;
  }

  public initFilter() {
    this.selectedBrands = [];
    this.priceFrom = 1;
    this.priceTo = 10000;
    this.sort = this.sortings[0];
  }

}
