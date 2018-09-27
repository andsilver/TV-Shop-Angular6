import * as FiltersAction from '../actions/filters-list.action';

export interface State {
   filtersList: any;
}

export const initialState: State = { filtersList: null };

export function reducer ( state = initialState, action: FiltersAction.Actions ): State {

    switch (action.type) {
        case FiltersAction.SAVE_FILTERS_LIST: {
            return { filtersList: action.payload };
        }
        case FiltersAction.REMOVE_FILTERS_LIST: {
            return { filtersList: null };
        }
        default:
            return state;
    }
}
