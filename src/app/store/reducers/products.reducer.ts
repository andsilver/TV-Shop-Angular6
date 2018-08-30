import { Products } from '../../app.models';
import * as ProductsActions from '../actions/products.action';

export interface State {
    data: Products;
    error: String | null;
}

export const initialState: State = { data: null, error: null };

export function reducer ( state = initialState, action: ProductsActions.Actions ): State {

    switch (action.type) {
        case ProductsActions.SUCCESS_GET_PRODUCTS: {
            return { data: action.payload, error: null };
        }
        case ProductsActions.FAILED_GET_PRODUCTS: {
            return {
                ...state,
                error: action.payload.message
            };
        }
        default:
            return state;
    }
}

export const getProducts = (state: State) => state.data;

