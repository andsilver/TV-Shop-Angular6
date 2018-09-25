import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};
import { SatPopoverModule } from '@ncstate/sat-popover';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PipesModule } from '../theme/pipes/pipes.module';
import { RatingComponent } from './rating/rating.component';
import { ControlsComponent } from './controls/controls.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { BrandsCarouselComponent } from './brands-carousel/brands-carousel.component';
import { ProductsCarouselComponent } from './products-carousel/products-carousel.component';
import { ProductDialogComponent } from './products-carousel/product-dialog/product-dialog.component';
import { BannersComponent } from './banners/banners.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddedToCartPopupComponent } from './added-to-cart-popup/added-to-cart-popup.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { LazyLoadImagesModule } from 'ngx-lazy-load-images';
import { ExtraInfoComponent } from './extra-info/extra-info.component';
import { FiltersListComponent } from './filters-list/filters-list.component';
import { DescriptionPopoverComponent } from './description-popover/description-popover.component';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faShoppingCart,
  faCheckCircle,
  faComment,
  faEnvelopeOpen,
  faCircle,
  faPlus,
  faMinus,
  faPhone,
  faInfoCircle,
  faTrash,
  faChevronCircleRight,
  faCaretRight} from '@fortawesome/free-solid-svg-icons';

import {
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';

// Add an icon to the library for convenient access in other components
library.add(
  faShoppingCart,
  faCheckCircle,
  faComment,
  faEnvelopeOpen,
  faCircle,
  faPlus,
  faMinus,
  faPhone,
  faInfoCircle,
  faTrash,
  faChevronCircleRight,
  faCaretRight,
  faWhatsapp);

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
    SatPopoverModule,
    FontAwesomeModule
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
