import { Action } from '@ngrx/store';
import { Products, Error } from '../../app.models';

export const FILTER_PRODUCTS = '[PRODUCTS] Filter';
export const CATEGORY_PRODUCTS = '[PRODUCTS] Category';
export const MODE_PRODUCTS = '[PRODUCTS] Mode';
export const SUCCESS_GET_PRODUCTS = '[PRODUCTS] Success';
export const FAILED_GET_PRODUCTS = '[PRODUCTS] Failed';

export class FilterProducts implements Action {
    readonly type = FILTER_PRODUCTS;
    constructor(public payload: number = 0) {}
}

export class CategoryProducts implements Action {
    readonly type = CATEGORY_PRODUCTS;
    constructor(public payload: any) {}
}

export class ModeProducts implements Action {
    readonly type = MODE_PRODUCTS;
    constructor(public payload: string) {}
}

export class SuccessProducts implements Action {
    readonly type = SUCCESS_GET_PRODUCTS;
    constructor(public payload: Products) {}
}

export class FailedProducts implements Action {
    readonly type = FAILED_GET_PRODUCTS;
    constructor(public payload: Error ) {}
}

export type Actions = FilterProducts | CategoryProducts | ModeProducts | SuccessProducts | FailedProducts;
