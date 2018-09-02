import { Product } from '../../app.models';
import * as ProductActions from '../actions/product.action';

export interface State {
    product: Product;
}

export const initialState: State = { product: null };

export function reducer ( state = initialState, action: ProductActions.Actions ): State {

    switch (action.type) {
        case ProductActions.SAVE_PRODUCT: {
            return { product: action.payload };
        }
        case ProductActions.READ_PRODUCT: {
            return state;
        }
        default:
            return state;
    }
}

