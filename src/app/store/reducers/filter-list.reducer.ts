import { Category } from '../../app.models';
import * as FilterActions from '../actions/filter-list.action';

export interface State {
    filterList: any;
}

export const initialState: State = { filterList: [] };

export function reducer ( state = initialState, action: FilterActions.Actions ): State {

    switch (action.type) {
        case FilterActions.SAVE_FILTER: {
            return { filterList: action.payload };
        }
        case FilterActions.REMOVE_FILTER: {
            return { filterList: null };
        }
        default:
            return state;
    }
}
