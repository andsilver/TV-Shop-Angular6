import { Action } from '@ngrx/store';
import { Product } from 'app/app.models';

export const GET_CARTLIST = '[CARTLIST] Get';
export const ADD_TO_CARTLIST = '[CARTLIST] Add';
export const REMOVE_FROM_CARTLIST = '[CARTLIST] Remove';

export class GetCartlist implements Action {
    readonly type = GET_CARTLIST;
    constructor() {}
}

export class AddToCartlist implements Action {
    readonly type = ADD_TO_CARTLIST;
    constructor(public payload: Product) {}
}

export class RemoveFromCartlist implements Action {
    readonly type = REMOVE_FROM_CARTLIST;
    constructor(public payload: number) {}
}

export type Actions = GetCartlist | AddToCartlist | RemoveFromCartlist;
