import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IFileItem} from '../../interfaces/interfaces';
import {Store} from '@ngrx/store';
import {selectActiveFile} from '../../state/active-file/active-file.selectors';
import {TableModule} from 'primeng/table';
import {NgIf} from '@angular/common';
import {activeFileActions} from '../../state/active-file/active-file.actions';

@Component({
  selector: 'app-file-vizualize',
  templateUrl: './file-vizualize.component.html',
  styleUrl: './file-vizualize.component.less',
  standalone: true,
  imports: [
    TableModule,
    NgIf
  ],
  providers: []
})
export class FileVizualizeComponent implements OnInit{
  // implements OnInit, OnDestroy
  file$: Observable<IFileItem[]>;
  file!: IFileItem[];

  constructor(private store: Store) {
    this.file$ = this.store.select(selectActiveFile)
  }

  ngOnInit() {
    this.file$.subscribe((file) => {
      this.file = file
    })
  }
  closeFile () {
    this.store.dispatch(activeFileActions.closeActiveFile())
  }
  // ngOnDestroy() {
  // }
}
