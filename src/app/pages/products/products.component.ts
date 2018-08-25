import { Component, OnInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of, Subscription } from 'rxjs';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category, Products } from '../../app.models';
import { SearchService } from './search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen = true;
  private routingSub: Subscription;
  private searchSub: Subscription;
  public viewType = 'grid';
  public viewCol = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort: any;
  public products: Array<Product> = [];
  public categories: Category[];
  public categoryId: number;
  public brands = [];
  public selectedBrands = [];
  public priceFrom = 0;
  public priceTo = 2000;
  public colors = [ '#5C6BC0', '#66BB6A', '#EF5350', '#BA68C8', '#FF4081', '#9575CD', '#90CAF9', '#B2DFDB', '#DCE775',
                    '#FFD740', '#00E676', '#FBC02D', '#FF7043', '#F5F5F5', '#000000'];
  public selectedColors = [];
  public sizes = ['S', 'M', 'L', 'XL', '2XL', '32', '36', '38', '46', '52', '13.3\'', '15.4\'', '17\'', '21\'', '23.4\''];
  public selectedSizes = [];
  public page = 0;
  public totalProducts = 0;

  constructor(private activatedRoute: ActivatedRoute,
              public appService: AppService,
              public dialog: MatDialog,
              private router: Router,
              private search: SearchService) { }

  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }
    this.brands = this.search.brands.manufacturer;
    this.categories = this.search.categories;
    this.searchSub = this.search.searchPerformed.subscribe(() => this.getProducts());
    this.routingSub = this.activatedRoute.paramMap.subscribe((params) => {
          const category = this.categories.find(c => c.name.toLowerCase() === params.get('name'));
          this.categoryId = category ? category.id : 0;
          this.page = 1;
          this.search.searchPerformed.next();
        });
    console.log(this.brands, this.categories);
  }

  public getProducts() {
    const filter = {
      keyword: this.search.keyword,
      categoryId: this.categoryId,
      fromPrice: this.priceFrom,
      toPrice: this.priceTo,
      filterAttributes: {
        brands: this.selectedBrands.map(b => b.name),
        color: this.selectedColors,
        size: this.selectedSizes
      },
      sort: this.sort,
      limit: this.count,
      page: this.page
    };

    this.appService.getProductsByFilter(filter).subscribe((data: Products) => {
      this.products = data.products ? data.products : [];
      this.totalProducts = data.total;
    });
  }

  public getCategories() {
    if (this.appService.Data.categories.length === 0) {
      return this.appService.getCategories();
    } else {
      return of(this.appService.Data.categories);
    }
  }

  public getBrands() {
    this.appService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
    this.routingSub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count) {
    this.count = count;
    this.page = 1;
    this.getProducts();
  }

  public changeSorting(sort) {
    this.sort = sort;
    this.products.sort((p1, p2) => {
        if (sort === 'Lowest first') {
          return Number(p1.newPrice) < Number(p2.newPrice) ? -1 : 1;
        } else if (sort === 'Highest first') {
          return Number(p1.newPrice) > Number(p2.newPrice) ? -1 : 1;
        }
      });
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
    this.getProducts();
  }

  public selectColor(color) {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    this.getProducts();
  }

  public selectBrand(brand) {
    const index = this.selectedBrands.indexOf(brand);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }
    this.getProducts();
  }

}
