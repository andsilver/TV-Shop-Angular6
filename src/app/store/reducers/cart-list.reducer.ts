import { Product } from '../../app.models';
import * as CartlistActions from '../actions/cart-list.action';

export interface State {
    products: Product[];
    totalPrice: number;
}

export const initialState: State = { products: [], totalPrice: 0 };

export function reducer ( state = initialState, action: CartlistActions.Actions ): State {

    switch (action.type) {
        case CartlistActions.GET_CARTLIST: {
            return state;
        }
        case CartlistActions.ADD_TO_CARTLIST: {
            const product: Product = action.payload;
            return { ...state };
        }
        default:
            return state;
    }
}
