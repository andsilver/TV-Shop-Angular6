import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';

import { StoreComponent } from './store/store.component';

export const routes: Route[] = [
  {
    path: ':id', component: StoreComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [StoreComponent]
})
export class StoresModule { }
