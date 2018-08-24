import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterBrandsPipe } from './filter-brands.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { CustomCurrencyPipe } from './custom-currency.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        CustomCurrencyPipe
    ],
    exports: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        CustomCurrencyPipe
    ]
})
export class PipesModule { }
