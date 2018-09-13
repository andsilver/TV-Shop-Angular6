import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SatPopoverModule } from '@ncstate/sat-popover';

import { SharedModule } from '../../shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { LayoutComponent } from './layout/layout.component';

import { NotMatchComponent } from './not-match/not-match.component';
import { BestPriceDialogComponent } from './best-price-dialog/best-price-dialog.component';
import { DescriptionPopoverComponent } from './description-popover/description-popover.component';

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
    SharedModule,
    SatPopoverModule
  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductZoomComponent,
    LayoutComponent,
    NotMatchComponent,
    BestPriceDialogComponent,
    DescriptionPopoverComponent
  ],
  entryComponents: [
    ProductZoomComponent,
    BestPriceDialogComponent
  ]
})
export class ProductsModule { }
