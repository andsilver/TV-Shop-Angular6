import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { StoresCarouselComponent } from './stores-carousel/stores-carousel.component';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';
import { ProductComponent } from './product/product.component';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    HomeComponent,
    StoresCarouselComponent,
    ProductsCarouselComponent,
    ProductComponent
  ],
  providers: [HomeService]
})
export class HomeModule { }
