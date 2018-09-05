import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromProducts from './reducers/products.reducer';
import * as fromBrands from './reducers/brands.reducer';
import * as fromCategories from './reducers/categories.reducer';
import * as fromProduct from './reducers/product.reducer';
import * as fromCategory from './reducers/category.reducer';
import * as fromCrumbpath from './reducers/crumb-path.reducer';

export interface State {
  products: fromProducts.State;
  brands: fromBrands.State;
  categories: fromCategories.State;
  product: fromProduct.State;
  category: fromCategory.State;
  crumbPath: fromCrumbpath.State;
}

export const initialState: State = {
  products : fromProducts.initialState,
  brands: fromBrands.initialState,
  categories: fromCategories.initialState,
  product: fromProduct.initialState,
  category: fromCategory.initialState,
  crumbPath: fromCrumbpath.initialState
};

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.reducer,
  brands: fromBrands.reducer,
  categories: fromCategories.reducer,
  product: fromProduct.reducer,
  category: fromCategory.reducer,
  crumbPath: fromCrumbpath.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State = initialState, action: any): State {
        // console.log('state', state);
        // console.log('action', action);
        return reducer(state, action);
    };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
