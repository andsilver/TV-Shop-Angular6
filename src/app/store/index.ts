import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromProducts from './reducers/products.reducer';

export interface State {
  products: fromProducts.State;
}

export const initialState: State = {
  products : fromProducts.initialState
};

export const reducers: ActionReducerMap<State> = {
  products: fromProducts.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function(state: State = initialState, action: any): State {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];
