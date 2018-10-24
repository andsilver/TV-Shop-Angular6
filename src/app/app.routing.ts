import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', loadChildren: 'app/pages/home/home.module#HomeModule' },
            { path: 'cart', loadChildren: 'app/pages/cart/cart.module#CartModule'},
            { path: 'checkout', loadChildren: 'app/pages/checkout/checkout.module#CheckoutModule'},
            { path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule'},
            { path: 'extrainfo', loadChildren: 'app/pages/extra-info/extra-info.module#ExtraInfoModule' },
            { path: 'psp', loadChildren: 'app/pages/payment/payment.module#PaymentModule'},
            { path: 'stores', loadChildren: 'app/pages/stores/stores.module#StoresModule' },
            { path: 'bestelstatus', loadChildren: 'app/pages/bestelstatus/bestelstatus.module#BestelStatusModule' },
            { path: '**', loadChildren: 'app/pages/products/products.module#ProductsModule' }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    // enableTracing: true
});
