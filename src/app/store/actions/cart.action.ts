import { Action } from '@ngrx/store';

export const SET_CART_ID = '[CART] Set';

export class SetCartId implements Action {
    readonly type = SET_CART_ID;
    constructor(public payload: any) {}
}

export type Actions = | SetCartId;
