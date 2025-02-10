import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectFiles} from '../../state/files/files.selectors';
import {Observable} from 'rxjs';
import {IFile, IFileItem} from '../../interfaces/interfaces';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {activeFileActions} from '../../state/active-file/active-file.actions';
import {selectActiveFile} from '../../state/active-file/active-file.selectors';

@Component({
  selector: 'app-history-loaded-files',
  templateUrl: './history-loaded-files.component.html',
  styleUrl: './history-loaded-files.component.less',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
  ],
  providers: []
})
export class HistoryLoadedFilesComponent implements OnInit {
  files$: Observable<IFile[]>;
  files!: IFile[];

  activeFile$: Observable<IFileItem[]>;
  activeFile!: boolean;

  constructor(private store: Store) {
    this.files$ = this.store.select(selectFiles)
    this.activeFile$ = this.store.select(selectActiveFile)
  }

  ngOnInit() {
    this.files$.subscribe((files) => {
      this.files = files
    })
    this.activeFile$.subscribe((activeFile) => {
      this.activeFile = activeFile.length > 0;
    })
  }

  loadFileVizualize = (file: IFileItem[]) => {
    this.store.dispatch(activeFileActions.addActiveFile({
      activeFile: file
    }))
  }
}

