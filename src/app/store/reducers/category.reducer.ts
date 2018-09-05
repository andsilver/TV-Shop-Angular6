import { Category } from '../../app.models';
import * as CategoryActions from '../actions/category.action';

export interface State {
    category: Category;
}

export const initialState: State = { category: null };

export function reducer ( state = initialState, action: CategoryActions.Actions ): State {

    switch (action.type) {
        case CategoryActions.SAVE_CATEGORY: {
            return { category: action.payload };
        }
        case CategoryActions.READ_CATEGORY: {
            return state;
        }
        case CategoryActions.REMOVE_CATEGORY: {
            return { category: null };
        }
        default:
            return state;
    }
}
