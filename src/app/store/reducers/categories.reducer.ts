import { Category } from '../../app.models';
import * as CategoriesActions from '../actions/categories.action';

export interface State {
    error: String | null;
    categories: Category[];
}

export const initialState: State = { categories: [], error: null };

export function reducer ( state = initialState, action: CategoriesActions.Actions ): State {

    switch (action.type) {
        case CategoriesActions.SUCCESS_GET_CATEGORIES: {
            return {
                categories: action.payload,
                error: null
            };
        }
        case CategoriesActions.FAILED_GET_CATEGORIES: {
            return {
                ...state,
                error: action.payload.message
            };
        }
        default:
            return state;
    }
}

