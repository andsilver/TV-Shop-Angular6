import { Action } from '@ngrx/store';
import { Category } from 'app/app.models';

export const GET_CATEGORY = '[CATEGORY] Get';
export const SAVE_CATEGORY = '[CATEGORY] Save';
export const READ_CATEGORY = '[CATEGORY] Read';
export const REMOVE_CATEGORY = '[CATEGORY] Remove';

export class GetCategory implements Action {
    readonly type = GET_CATEGORY;
    constructor(public payload: number) {}
}

export class SaveCategory implements Action {
    readonly type = SAVE_CATEGORY;
    constructor(public payload: Category) {}
}

export class ReadCategory implements Action {
    readonly type = READ_CATEGORY;
    constructor() {}
}

export class RemoveCategory implements Action {
    readonly type = REMOVE_CATEGORY;
    constructor() {}
}

export type Actions = SaveCategory | ReadCategory | RemoveCategory;
