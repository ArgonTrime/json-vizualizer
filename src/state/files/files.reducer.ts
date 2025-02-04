import {createReducer, on} from '@ngrx/store';
import {FilesActions} from './files.actions';
import {IFile, IFileItem, IFiles} from '../../interfaces/interfaces';

export const initialFilesState: ReadonlyArray<IFile> = [];

export const filesReducer = createReducer(
  initialFilesState,
  on(FilesActions.addFile, (state, file: IFile ) => {
    return [...state, file]
  })
)
