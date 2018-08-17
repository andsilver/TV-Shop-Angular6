import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { WishlistComponent } from './wishlist.component';

export const routes = [
  { path: '', component: WishlistComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    WishlistComponent
  ]
})
export class WishlistModule { }
