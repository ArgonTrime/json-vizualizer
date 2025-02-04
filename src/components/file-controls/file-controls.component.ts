import {Component} from '@angular/core';
import {HistoryLoadedFilesComponent} from '../history-loaded-files/history-loaded-files.component';
import {LoaderComponent} from '../loader/loader.component';

@Component({
  selector: 'app-file-controls',
  templateUrl: './file-controls.component.html',
  styleUrl: './file-controls.component.less',
  standalone: true,
  imports: [
    HistoryLoadedFilesComponent,
    LoaderComponent
  ],
  providers: []
})
export class FileControlsComponent {
}
