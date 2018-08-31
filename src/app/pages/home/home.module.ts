import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', resolve: { data: HomeService }  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [HomeService]
})
export class HomeModule { }
