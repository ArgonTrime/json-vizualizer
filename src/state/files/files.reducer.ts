import {createReducer, on} from '@ngrx/store';
import {FilesActions} from './files.actions';
import {IFile} from '../../interfaces/interfaces';

export const initialFilesState: ReadonlyArray<IFile> = [];

export const filesReducer = createReducer(
  initialFilesState,
  on(FilesActions.addFile, (state, file: IFile ) => {
    return state.length === 5 ? [...state.slice(1), file] : [...state, file]
  })
)
