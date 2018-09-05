import * as CrumbPathActions from '../actions/crumb-path.action';

export interface State {
    crumbPath: any;
}

export const initialState: State = { crumbPath: [] };

export function reducer ( state = initialState, action: CrumbPathActions.Actions ): State {

    switch (action.type) {
        case CrumbPathActions.SAVE_CRUMB_PATH: {
            return { crumbPath: action.payload };
        }
        case CrumbPathActions.READ_CRUMB_PATH: {
            return state;
        }
        default:
            return state;
    }
}

