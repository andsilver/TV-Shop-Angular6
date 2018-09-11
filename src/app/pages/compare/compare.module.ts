import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CompareComponent } from './compare.component';

export const routes = [
  { path: '', component: CompareComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    CompareComponent
  ]
})
export class CompareModule { }
