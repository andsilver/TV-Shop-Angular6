import { Action } from '@ngrx/store';

export const SET_KEYWORD = '[KEYWORD] Set';

export class SetKeyword implements Action {
    readonly type = SET_KEYWORD;
    constructor(public payload: string) {}
}

export type Actions = | SetKeyword;
