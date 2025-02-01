import { Component } from '@angular/core';
import { LoaderComponent } from "../components/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'json-vizualizer';
}
