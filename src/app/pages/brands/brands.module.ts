import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { BrandsComponent } from './brands.component';
import { BrandComponent } from './brand/brand.component';

export const routes = [
  { path: '', component: BrandsComponent, pathMatch: 'full' },
  { path: ':name', component: BrandComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    BrandsComponent,
    BrandComponent
  ]
})
export class BrandsModule { }
