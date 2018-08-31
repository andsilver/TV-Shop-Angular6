import { Brands } from '../../app.models';
import * as BrandsActions from '../actions/brands.action';

export interface State extends Brands {
    error: string;
}

export const initialState: State = { manufacturer: [], limit: 10, page: 0, total: 0, total_pages: 0, error: null };

export function reducer ( state = initialState, action: BrandsActions.Actions ): State {

    switch (action.type) {
        case BrandsActions.SUCCESS_GET_BRANDS: {
            return { ...action.payload, error: null };
        }
        case BrandsActions.FAILED_GET_BRANDS: {
            return { ...state, error: null };
        }
        default:
            return state;
    }
}
