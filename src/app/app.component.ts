import { Component } from '@angular/core';
import {FileVizualizeComponent} from '../components/file-vizualize/file-vizualize.component';
import {FileControlsComponent} from '../components/file-controls/file-controls.component';

@Component({
  selector: 'app-root',
  imports: [FileVizualizeComponent, FileControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'json-vizualizer';
}
