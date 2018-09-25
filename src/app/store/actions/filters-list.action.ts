import { Action } from '@ngrx/store';

export const SAVE_FILTERS_LIST = '[FILTER] Save';
export const REMOVE_FILTERS_LIST = '[FILTER] Remove';

export class SaveFilterList implements Action {
    readonly type = SAVE_FILTERS_LIST;
    constructor(public payload: any) {}
}

export class RemoveFilterList implements Action {
    readonly type = REMOVE_FILTERS_LIST;
    constructor() {}
}

export type Actions = SaveFilterList | RemoveFilterList;
