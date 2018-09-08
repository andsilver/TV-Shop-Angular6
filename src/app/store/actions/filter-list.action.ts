import { Action } from '@ngrx/store';

export const SAVE_FILTER = '[FILTER] Save';
export const REMOVE_FILTER = '[FILTER] Remove';

export class SaveFilter implements Action {
    readonly type = SAVE_FILTER;
    constructor(const payload: any) {}
}

export class RemoveFilter implements Action {
    readonly type = REMOVE_FILTER;
    constructor() {}
}

export type Actions = SaveFilter | RemoveFilter;
