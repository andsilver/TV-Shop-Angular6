import { Action } from '@ngrx/store';
import { Product } from 'app/app.models';

export const GET_PRODUCT = '[PRODUCT] Get';
export const SAVE_PRODUCT = '[PRODUCT] Save';
export const READ_PRODUCT = '[PRODUCT] Read';
export const REMOVE_PRODUCT = '[PRODUCT] Remove';

export class GetProduct implements Action {
    readonly type = GET_PRODUCT;
    constructor(public payload: any) {}
}

export class SaveProduct implements Action {
    readonly type = SAVE_PRODUCT;
    constructor(public payload: Product) {}
}

export class ReadProduct implements Action {
    readonly type = READ_PRODUCT;
    constructor() {}
}

export class RemoveProduct implements Action {
    readonly type = REMOVE_PRODUCT;
    constructor() {}
}

export type Actions = GetProduct | SaveProduct | ReadProduct | RemoveProduct;
