import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { CurrencyService } from 'app/services';
import { Product, Category, Products } from "../../app.models";
import { SearchService } from './search.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
  public sort:any;
  public products: Array<Product> = [];
  public categories:Category[];
  public category: string;
  public brands = [];
  public selectedBrands = [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public colors = ["#5C6BC0","#66BB6A","#EF5350","#BA68C8","#FF4081","#9575CD","#90CAF9","#B2DFDB","#DCE775","#FFD740","#00E676","#FBC02D","#FF7043","#F5F5F5","#000000"];
  public selectedColors = [];
  public sizes = ["S","M","L","XL","2XL","32","36","38","46","52","13.3\"","15.4\"","17\"","21\"","23.4\""];
  public selectedSizes = [];
  public page:any = 0;
  public totalProducts: number = 0;

  public filter: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              public appService:AppService,
              public dialog: MatDialog,
              public cc: CurrencyService,
              private router: Router,
              private search: SearchService) { }

  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.getBrands();
    this.sub 
      = this.getCategories()
        .pipe(
          switchMap((categories) => {
            this.categories = categories;
            this.appService.Data.categories = categories;
            return this.activatedRoute.paramMap;
          })
        )
        .subscribe((params) => {
          const category = params.get("name");
          if(category && category != this.category) {
            this.category = category;
            this.page = 1;
            this.getProducts();
          }
          else {
            this.category = null;
            this.page = 1;
            this.getProducts();
          }
        })
    this.search.searchPerformed.subscribe(keyword=> this.getProducts());
  }

  public getProducts(){
    this.filter = {
      keyword: this.search.keyword,
      categoryId: !this.category ? 0 : this.categories.find( c => c.name.toLowerCase() == this.category ).id,
      filterAttributes: {
        brands: this.selectedBrands.map(b=>b.name)
      },
      sort: this.sort,
      limit: this.count,
      page: this.page
    }

    this.appService.getProductsByFilter(this.filter).subscribe(data=>{
      this.products = data.products ? data.products : [];
      this.totalProducts = data.total;
      console.log(data)
    })

    // const setResource = (data) => {
    //   this.products = data.products;
    //   this.totalProducts = data.total;
    //   console.log(data);
    // }
    // if(!this.category){
    //   this.appService.getProducts('all', this.count, this.page).subscribe(data=> setResource(data));
    // } else {
    //   const id = this.categories.find( c => c.name.toLowerCase() == this.category ).id;
    //   this.appService.getProductsByCategory(id, this.count, this.page).subscribe((data) => setResource(data));
    // }
  }

  public getCategories(){  
    if(this.appService.Data.categories.length == 0) { 
      return this.appService.getCategories()
    }
    else{
      return of(this.appService.Data.categories);
    }
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count){
    this.count = count;
    this.page = 1;
    this.getProducts();
  }

  public changeSorting(sort){
    this.sort = sort;
    this.products.sort((p1,p2) => {
        if (sort == 'Lowest first') {
          return Number(p1.newPrice) < Number(p2.newPrice) ? -1 : 1;
        }
        else if (sort == 'Highest first'){
          return Number(p1.newPrice) > Number(p2.newPrice) ? -1 : 1;
        }
      });
    console.log(this.products)
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]); 
      }
    });
  }

  public onPageChanged(event){
      this.page = event;
      this.getProducts();
      window.scrollTo(0,0); 
  }

  public onChangeCategory(event){
    if(event.target){
      this.router.navigate(['/products', event.target.innerText.toLowerCase()]); 
    }   
  }

  public selectSize(size) {
    var index = this.selectedSizes.indexOf(size);
    if(index > -1) 
      this.selectedSizes.splice(index, 1);
    else
      this.selectedSizes.push(size);
  }

  public selectColor(color) {
    var index = this.selectedColors.indexOf(color);
    if(index > -1) 
      this.selectedColors.splice(index, 1);
    else
      this.selectedColors.push(color);
  }

  public selectBrand(brand) {
    var index = this.selectedBrands.indexOf(brand);
    if(index > -1) 
      this.selectedBrands.splice(index, 1);
    else
      this.selectedBrands.push(brand);
    this.getProducts();
  }

}
