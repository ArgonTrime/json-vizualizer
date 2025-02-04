import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {IFileItem} from '../../interfaces/interfaces';

export const activeFileActions = createActionGroup({
  source: 'Active File',
  events: {
    'Add active file': props<{activeFile: IFileItem[]}>(),
    'Close active file': emptyProps()
  }
});
