import { Action } from '@ngrx/store';
import { Category, Error } from 'app/app.models';

export const GET_CATEGORIES = '[CATEGORIES] Get';
export const GET_ALL_CATEGORIES = '[CATEGORIES] Get All';
export const SUCCESS_GET_CATEGORIES = '[CATEGORIES] Success';
export const SUCCESS_GET_ALL_CATEGORIES = '[CATEGORIES] Success All';
export const FAILED_GET_CATEGORIES = '[CATEGORIES] Failed';

export class GetCategories implements Action {
    readonly type = GET_CATEGORIES;
    constructor(public payload: any = 0) {}
}

export class GetAllCategories implements Action {
    readonly type = GET_ALL_CATEGORIES;
    constructor() {}
}

export class SuccessGetCategories implements Action {
    readonly type = SUCCESS_GET_CATEGORIES;
    constructor(public payload: Category[]) {}
}

export class SuccessGetAllCategories implements Action {
    readonly type = SUCCESS_GET_ALL_CATEGORIES;
    constructor(public payload: Category[]) {}
}

export class FailedGetCategories implements Action {
    readonly type = FAILED_GET_CATEGORIES;
    constructor(public payload: Error) {}
}

export type Actions = GetCategories | GetAllCategories | SuccessGetCategories | SuccessGetAllCategories | FailedGetCategories;
