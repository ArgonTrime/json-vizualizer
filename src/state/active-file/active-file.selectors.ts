import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IFileItem} from '../../interfaces/interfaces';

export const selectActiveFileState = createFeatureSelector<IFileItem[]>('activeFile')

export const selectActiveFile = createSelector(
  selectActiveFileState,
  (state) => state
)
