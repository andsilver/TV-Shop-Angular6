import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { BrandsComponent } from './brands.component';
import { BrandComponent } from './brand/brand.component';
import { BrandsService } from './brands.service';

export const routes = [
  { path: '', component: BrandsComponent, pathMatch: 'full' },
  { path: ':name', component: BrandComponent, resolve: { data: BrandsService } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NgxPaginationModule,
    SharedModule,
  ],
  declarations: [
    BrandsComponent,
    BrandComponent
  ],
  providers: [BrandsService]
})
export class BrandsModule { }
