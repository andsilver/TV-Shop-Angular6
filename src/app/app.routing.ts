import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { InitStateService } from './services';

export const routes: Routes = [
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: '',
        component: PagesComponent,
        // resolve: { data: InitStateService },
        children: [
            { path: '', loadChildren: 'app/pages/home/home.module#HomeModule' },
            {
              path: 'account',
              loadChildren: 'app/pages/account/account.module#AccountModule'
            },
            { path: 'compare', loadChildren: 'app/pages/compare/compare.module#CompareModule'},
            { path: 'wishlist', loadChildren: 'app/pages/wishlist/wishlist.module#WishlistModule'},
            { path: 'cart', loadChildren: 'app/pages/cart/cart.module#CartModule'},
            { path: 'checkout', loadChildren: 'app/pages/checkout/checkout.module#CheckoutModule'},
            { path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule'},
            { path: 'sign-in', loadChildren: 'app/pages/sign-in/sign-in.module#SignInModule'},
            { path: 'brands', loadChildren: 'app/pages/brands/brands.module#BrandsModule'},
            {
              path: 'stores', loadChildren: 'app/pages/stores/stores.module#StoresModule'
            },
            {
              path: '**',
              loadChildren: 'app/pages/products/products.module#ProductsModule'
            }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
});
