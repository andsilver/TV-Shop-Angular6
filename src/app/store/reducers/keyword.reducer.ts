import * as KeywordActions from '../actions/keyword.action';

export interface State {
   keyword: string;
}

export const initialState: State = { keyword: '' };

export function reducer ( state = initialState, action: KeywordActions.Actions ): State {

    switch (action.type) {
        case KeywordActions.SET_KEYWORD: {
            return { keyword: action.payload };
        }
        default:
            return state;
    }
}
