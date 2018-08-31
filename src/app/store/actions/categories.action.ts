import { Action } from '@ngrx/store';
import { Category, Error } from 'app/app.models';

export const GET_CATEGORIES = '[CATEGORIES] Get';
export const SUCCESS_GET_CATEGORIES = '[CATEGORIES] Success';
export const FAILED_GET_CATEGORIES = '[CATEGORIES] Failed';

export class GetCategories implements Action {
    readonly type = GET_CATEGORIES;
    constructor(public payload: any = 0) {}
}

export class SuccessGetCategories implements Action {
    readonly type = SUCCESS_GET_CATEGORIES;
    constructor(public payload: Category[]) {}
}

export class FailedGetCategories implements Action {
    readonly type = FAILED_GET_CATEGORIES;
    constructor(public payload: Error) {}
}

export type Actions = GetCategories | SuccessGetCategories | FailedGetCategories;
