import { Products } from '../../app.models';
import * as ProductsActions from '../actions/products.action';

export interface State extends Products {
    error: String | null;
}

export const initialState: State = { products: [], error: null, limit: 10, page: 0, total: 0, total_pages: 0 };

export function reducer ( state = initialState, action: ProductsActions.Actions ): State {

    switch (action.type) {
        case ProductsActions.SUCCESS_GET_PRODUCTS: {
            return { ...action.payload, error: null };
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

