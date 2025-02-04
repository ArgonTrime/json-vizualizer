import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IFile} from '../../interfaces/interfaces';

export const selectFilesState = createFeatureSelector<IFile[]>('files')

export const selectFiles = createSelector(
  selectFilesState,
  (state) => state
)
