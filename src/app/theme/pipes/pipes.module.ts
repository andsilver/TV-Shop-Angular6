import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterBrandsPipe } from './filter-brands.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import { JsonLoopPipe } from './json-loop.pipe';
import { UrlSantitizerPipe } from './url-santitizer.pipe';
import { HtmlSantitizerPipe } from './html-santitizer.pipe';
import { EncodeUriPipe } from './encode-uri.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        CustomCurrencyPipe,
        JsonLoopPipe,
        UrlSantitizerPipe,
        HtmlSantitizerPipe,
        EncodeUriPipe
    ],
    exports: [
        FilterByIdPipe,
        FilterBrandsPipe,
        BrandSearchPipe,
        CustomCurrencyPipe,
        JsonLoopPipe,
        UrlSantitizerPipe,
        HtmlSantitizerPipe,
        EncodeUriPipe
    ]
})
export class PipesModule { }
