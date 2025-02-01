import { Component } from '@angular/core';

import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.less',
  standalone: true,
  imports: [ToastModule, FileUpload],
  providers: [MessageService]
})
export class LoaderComponent {
  constructor(private messageService: MessageService) {}

  public files: any = [];

  loadFile (event: FileUploadHandlerEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });

    const dateLoad = new Date();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent = fileReader.result as string;
      const jsonData = JSON.parse(fileContent);

      this.files.push({
        nameFile: event.files[0].name,
        dateLoad,
        file: jsonData
      })
    }
    fileReader.readAsText(event.files[0])
    console.log(this.files)
  }
}
