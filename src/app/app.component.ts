import { Component } from '@angular/core';
import { LoaderComponent } from "../components/loader/loader.component";
import {HistoryLoadedFilesComponent} from '../components/history-loaded-files/history-loaded-files.component';
import {FileVizualizeComponent} from '../components/file-vizualize/file-vizualize.component';

@Component({
  selector: 'app-root',
  imports: [LoaderComponent, HistoryLoadedFilesComponent, FileVizualizeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'json-vizualizer';
}
