import { Category } from '../../app.models';
import * as CategoriesActions from '../actions/categories.action';

export interface State {
    error: String | null;
    categories: Category[];
    allCategories: Category[];
}

export const initialState: State = { categories: [], allCategories: [], error: null };

export function reducer ( state = initialState, action: CategoriesActions.Actions ): State {

    switch (action.type) {
        case CategoriesActions.SUCCESS_GET_ALL_CATEGORIES: {
            return Object.assign(state, {allCategories: action.payload, error: null});
        }
        case CategoriesActions.SUCCESS_GET_CATEGORIES: {
            state.categories = action.payload;
            state.error = null;
            return state;
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

