import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SwiperModule } from 'ngx-swiper-wrapper';

import { PipesModule } from '../theme/pipes/pipes.module';
import { AddedToCartPopupComponent } from './added-to-cart-popup/added-to-cart-popup.component';
import { BannersComponent } from './banners/banners.component';
import { BrandsCarouselComponent } from './brands-carousel/brands-carousel.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ControlsComponent } from './controls/controls.component';
import { DescriptionPopoverComponent } from './description-popover/description-popover.component';
import { ExtraInfoComponent } from './extra-info/extra-info.component';
import { FiltersListComponent } from './filters-list/filters-list.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { ProductDialogComponent } from './products-carousel/product-dialog/product-dialog.component';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';
import { RatingComponent } from './rating/rating.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SwiperModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    PerfectScrollbarModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBv2IOmt-5I3BoQ9xKl_y7anf7dEy-4194'
    }),
    LazyLoadImagesModule,
    SatPopoverModule,
    FontAwesomeModule
  ],
  exports: [
    SwiperModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
    PerfectScrollbarModule,
    PipesModule,
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    BannersComponent,
    CategoryListComponent,
    AddedToCartPopupComponent,
    GoogleMapComponent,
    ExtraInfoComponent,
    FiltersListComponent,
    DescriptionPopoverComponent,
    AgmCoreModule,
    LazyLoadImagesModule,
    SatPopoverModule
  ],
  declarations: [
    RatingComponent,
    ControlsComponent,
    MainCarouselComponent,
    BrandsCarouselComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    BannersComponent,
    CategoryListComponent,
    AddedToCartPopupComponent,
    GoogleMapComponent,
    ExtraInfoComponent,
    FiltersListComponent,
    DescriptionPopoverComponent
  ],
  entryComponents: [
    ProductDialogComponent,
    AddedToCartPopupComponent
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class SharedModule { }
