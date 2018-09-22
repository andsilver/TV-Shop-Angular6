import { Action } from '@ngrx/store';

export const WINDOW_SIZE_CHANGED = '[WINDOW] Changed';
export const WINDOW_SIZE = '[WINDOW] Size';

export class WindowSizeChanged implements Action {
    readonly type = WINDOW_SIZE_CHANGED;
    constructor(public payload: number) {}
}

export type Actions = WindowSizeChanged;
