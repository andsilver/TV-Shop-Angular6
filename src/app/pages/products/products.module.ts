import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../../shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { LayoutComponent } from './layout/layout.component';

import { NotMatchComponent } from './not-match/not-match.component';
import { BestPriceDialogComponent } from './best-price-dialog/best-price-dialog.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { OutdoorOpportunityDialogComponent } from './outdoor-opportunity-dialog/outdoor-opportunity-dialog.component';

export const routes = [
  {
    path: '**', component: LayoutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductZoomComponent,
    LayoutComponent,
    NotMatchComponent,
    BestPriceDialogComponent,
    ExchangeComponent,
    OutdoorOpportunityDialogComponent
  ],
  entryComponents: [
    ProductZoomComponent,
    BestPriceDialogComponent,
    ExchangeComponent,
    OutdoorOpportunityDialogComponent
  ]
})
export class ProductsModule { }
