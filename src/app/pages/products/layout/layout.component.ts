import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { State } from 'app/store';
import { Category, Product } from 'app/app.models';
import * as fromProduct from 'app/store/actions/product.action';
import * as fromCategory from 'app/store/actions/category.action';
import * as fromCrumbPath from 'app/store/actions/crumb-path.action';

@Component({
  selector: 'app-products-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  parentCategory: Category;
  category: Category;
  product:  Product;
  categories: Category[];
  subscriptions: Subscription[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>) {

    this.subscriptions = [
      store
        .select(state => state.category)
        .subscribe(data => this.parentCategory = data.category),

      store
        .select(state => state.product)
        .subscribe(data => {
          // this.product = (data.product && data.product.id) ? data.product : null;
          this.product = data.product;

          if ( this.product ) {
            this.product.crumbPath.push({
              name: this.product.name,
              id: this.product.id
            });
            this.store.dispatch( new fromCrumbPath.SaveCrumbPath(this.product.crumbPath));
          }
        }),

      store
        .select(state => state.categories)
        .pipe(
          switchMap(res => {
            this.categories = res.categories;
            return route.url;
          })
        )
        .subscribe(() => {
            console.log(router.url, this.category, this.parentCategory, this.product);
            this.category = this.categories.find((c) => c.permalink === `${router.url}/`);
            if (this.category) {
              this.store.dispatch(new fromCategory.SaveCategory(this.category));
              this.store.dispatch(new fromProduct.RemoveProduct());
              this.store.dispatch(new fromCrumbPath.SaveCrumbPath(this.category.crumbPath));
            } else if (!this.category) {
              const payload = { permalink: this.router.url, categoryId: this.parentCategory ? this.parentCategory.id : null };
              this.store.dispatch( new fromProduct.GetProduct(payload));
              this.store.dispatch( new fromCategory.RemoveCategory());
            }
        })
    ];
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach( subscription => subscription.unsubscribe() );
  }

}
