import * as CartActions from '../actions/cart.action';

export interface State {
    CartId: any;
}

export const initialState: State = { CartId: localStorage.getItem('cart_id') };

export function reducer ( state = initialState, action: CartActions.Actions ): State {

    switch (action.type) {
        case CartActions.SET_CART_ID: {
            return {CartId: action.payload};
        }
        default:
            return state;
    }
}
