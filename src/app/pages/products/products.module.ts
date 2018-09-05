import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { LayoutComponent } from './layout/layout.component';

import { LayoutService } from './layout/layout.service';
import { ProductService } from './product/product.service';
import { NotMatchComponent } from './not-match/not-match.component';

export const routes = [
  { path: '**', component: LayoutComponent },
  // { path: '', component: ProductsComponent, pathMatch: 'full' },
  // { path: ':name', component: ProductsComponent },
  // { path: ':id/:name', component: ProductComponent, resolve: { data: ProductService } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductZoomComponent,
    LayoutComponent,
    NotMatchComponent
  ],
  entryComponents: [
    ProductZoomComponent
  ],
  providers: [ ProductService ]
})
export class ProductsModule { }
