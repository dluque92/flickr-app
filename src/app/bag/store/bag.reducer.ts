import { Photo } from '../../core/interfaces/common.interface';
import * as BagActions from './bag.actions';

const initialState = {
  photos: []
};

export function bagReducer(
  state = initialState,
  action: BagActions.BagActions
) {
  switch (action.type) {
    case BagActions.ADD_PHOTO:
      return {
        ...state,
        photos: [...state.photos, action.payload]
      };
    case BagActions.REMOVE_PHOTO:
      const oldPhotos = [...state.photos].filter((photo: Photo) => photo.id !== action.payload);
      return {
        ...state,
        photos: oldPhotos
      };
    default:
      return state;
  }
  return state;
}
