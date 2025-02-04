import {Component} from '@angular/core';

import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {Store} from '@ngrx/store';
import {FilesActions} from '../../state/files/files.actions';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.less',
  standalone: true,
  imports: [ToastModule, FileUpload],
  providers: [MessageService]
})
export class LoaderComponent {
  constructor(private messageService: MessageService, private store: Store) {}


  loadFile (event: FileUploadHandlerEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent = fileReader.result as string;
      const jsonData = JSON.parse(fileContent);

      this.store.dispatch(FilesActions.addFile({
        nameFile: event.files[0].name,
        dateLoad: new Date(),
        file: jsonData
      }))
    }
    fileReader.readAsText(event.files[0])
  }
}
