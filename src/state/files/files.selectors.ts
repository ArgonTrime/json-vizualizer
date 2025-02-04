import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IFile, IFiles} from '../../interfaces/interfaces';

// export const selectFiles = createFeatureSelector<ReadonlyArray<IFiles>>('files')
// export const selectFiles = createSelector<ReadonlyArray<IFiles>>(state => state);
// export const selectFiles = createFeatureSelector<IFiles>('files');
export const selectFilesState = createFeatureSelector<IFile[]>('files')

export const selectFiles = createSelector(
  selectFilesState,
  (state) => state
)
