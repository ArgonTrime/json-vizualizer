import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {IFileItem} from '../../interfaces/interfaces';

export const FilesActions = createActionGroup({
  source: 'Files',
  events: {
    'Add file': props<{
      dateLoad: Date,
      file: IFileItem[],
      nameFile: string
    }>()
  }
});
