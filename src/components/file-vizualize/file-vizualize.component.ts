import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {IFileItem} from '../../interfaces/interfaces';
import {Store} from '@ngrx/store';
import {selectActiveFile} from '../../state/active-file/active-file.selectors';

@Component({
  selector: 'app-file-vizualize',
  templateUrl: './file-vizualize.component.html',
  styleUrl: './file-vizualize.component.less',
  standalone: true,
  imports: [],
  providers: []
})
export class FileVizualizeComponent {
  file$: Observable<IFileItem[]>
  constructor(private store: Store) {
    this.file$ = this.store.select(selectActiveFile)
  }
}
