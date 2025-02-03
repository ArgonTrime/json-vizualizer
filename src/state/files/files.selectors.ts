import {createFeatureSelector} from '@ngrx/store';
import {IFile, IFiles} from '../../interfaces/interfaces';

export const selectFiles = createFeatureSelector<ReadonlyArray<IFiles>>('files')
