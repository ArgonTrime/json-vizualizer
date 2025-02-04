import {createReducer, on} from '@ngrx/store';
import {IFile, IFileItem} from '../../interfaces/interfaces';
import {activeFileActions} from './active-file.actions';

export const initialFilesState: ReadonlyArray<IFileItem> = [];

export const activeFileReducer = createReducer(
  initialFilesState,
  on(activeFileActions.addActiveFile, (state, { activeFile}: { activeFile: IFileItem[]}) => {
    return [...activeFile]
  })
)
