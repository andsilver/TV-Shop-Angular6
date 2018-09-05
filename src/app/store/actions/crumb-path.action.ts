import { Action } from '@ngrx/store';

export const SAVE_CRUMB_PATH = '[CRUMBPATH] Save';
export const READ_CRUMB_PATH = '[CRUMBPATH] Read';

export class SaveCrumbPath implements Action {
    readonly type = SAVE_CRUMB_PATH;
    constructor(public payload: any) {}
}

export class ReadCrumbPath implements Action {
    readonly type = READ_CRUMB_PATH;
    constructor() {}
}

export type Actions = SaveCrumbPath | ReadCrumbPath;
