import { Action } from '@ngrx/store';
import { Brands, Error } from 'app/app.models';

export const GET_BRANDS = '[BRANDS] Get';
export const GET_ALL_BRANDS = '[BRANDS] All';
export const SUCCESS_GET_BRANDS = '[BRANDS] Success';
export const FAILED_GET_BRANDS = '[BRANDS] Failed';

export class GetBrands implements Action {
    readonly type = GET_BRANDS;
    constructor(public payload: number) {}
}

export class GetAllBrands implements Action {
    readonly type = GET_ALL_BRANDS;
    constructor() {}
}

export class SuccessGetBrands implements Action {
    readonly type = SUCCESS_GET_BRANDS;
    constructor(public payload: Brands) {}
}

export class FailedGetBrands implements Action {
    readonly type = FAILED_GET_BRANDS;
    constructor(public payload: Error) {}
}

export type Actions = GetBrands | GetAllBrands | SuccessGetBrands | FailedGetBrands;
