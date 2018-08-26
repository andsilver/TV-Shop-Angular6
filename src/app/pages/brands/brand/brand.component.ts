import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../../app.service';
import { Product, Category } from '../../../app.models';
import { BrandsService } from '../brands.service';
import { FilterService } from 'app/services';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen = true;
  private searchSub: any;
  private routingSub: any;
  public viewType = 'grid';
  public viewCol = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort: any;
  public products: Array<Product> = [];
  public categories: Category[];
  public brands = [];
  public priceFrom = 1;
  public priceTo = 2000;
  public colors = ['#5C6BC0', '#66BB6A', '#EF5350', '#BA68C8', '#FF4081', '#9575CD', '#90CAF9', '#B2DFDB',
                   '#DCE775', '#FFD740', '#00E676', '#FBC02D', '#FF7043', '#F5F5F5', '#000000'];
  public sizes = ['S', 'M', 'L', 'XL', '2XL', '32', '36', '38', '46', '52', '13.3\'', '15.4\'', '17\'', '21\'', '23.4\''];
  public page;
  public brand;
  public selectedColors = [];
  public selectedSizes = [];
  public totalProducts = 0;

  constructor(private activatedRoute: ActivatedRoute,
              public appService: AppService,
              public dialog: MatDialog,
              private router: Router,
              private brandsService: BrandsService,
              private filter: FilterService) { }

  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];

    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }

    this.categories = this.brandsService.categories;
    this.searchSub = this.filter.searchPerformed.subscribe(() => this.getProducts());
    this.routingSub = this.activatedRoute.paramMap.subscribe((params) => {
          this.brand = params.get('name');
          this.page = 1;
          this.filter.searchPerformed.next();
        });
  }

  public getProducts() {
    const filter = {
      keyword: this.filter.keyword,
      categoryId: '',
      fromPrice: this.priceFrom,
      toPrice: this.priceTo,
      filterAttributes: {
        brands: [this.brand],
        // color: this.selectedColors,
        // size: this.selectedSizes
      },
      sort: this.sort,
      limit: this.count,
      page: this.page
    };

    this.appService.getProductsByFilter(filter).subscribe(data => {
      this.products = data.products ? data.products : [];
      this.totalProducts = data.total;
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
    this.getProducts();
  }

  public changeSorting(sort) {
    this.sort = sort;
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

}
