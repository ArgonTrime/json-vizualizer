import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectFiles} from '../../state/files/files.selectors';
import {Observable} from 'rxjs';
import {IFile, IFileItem} from '../../interfaces/interfaces';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {activeFileActions} from '../../state/active-file/active-file.actions';

@Component({
  selector: 'app-history-loaded-files',
  templateUrl: './history-loaded-files.component.html',
  styleUrl: './history-loaded-files.component.less',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    NgIf,
    NgForOf,
  ],
  providers: []
})
export class HistoryLoadedFilesComponent {
  files$: Observable<IFile[]>;

  constructor(private store: Store) {
    this.files$ = this.store.select(selectFiles)
  }
  loadFileVizualize = (file: IFileItem[]) => {
    this.store.dispatch(activeFileActions.addActiveFile({
      activeFile: file
    }))
  }
}

