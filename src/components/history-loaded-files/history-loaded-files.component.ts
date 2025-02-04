import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectFiles} from '../../state/files/files.selectors';
import {Observable} from 'rxjs';
import {IFile} from '../../interfaces/interfaces';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

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
}

