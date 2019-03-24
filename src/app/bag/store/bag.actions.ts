import { Action } from '@ngrx/store';

export const ADD_PHOTO = 'ADD_PHOTO';
export const REMOVE_PHOTO = 'REMOVE_PHOTO';

export class AddPhoto implements Action {
  readonly type = ADD_PHOTO;
  constructor(public payload: any) {}
}

export class RemovePhoto implements Action {
  readonly type = REMOVE_PHOTO;
  constructor(public payload: string) {}
}

export type BagActions = AddPhoto | RemovePhoto;
