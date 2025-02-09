import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {IFileItem} from '../../interfaces/interfaces';
import {Store} from '@ngrx/store';
import {selectActiveFile} from '../../state/active-file/active-file.selectors';
import {Table, TableModule} from 'primeng/table';
import {NgIf} from '@angular/common';
import {activeFileActions} from '../../state/active-file/active-file.actions';
import {PieChartComponent} from '../pie-chart/pie-chart.component';
import {BarChartComponent} from '../bar-chart/bar-chart.component';
import {SortEvent} from 'primeng/api';
import {ButtonDirective, ButtonLabel} from 'primeng/button';

@Component({
  selector: 'app-file-vizualize',
  templateUrl: './file-vizualize.component.html',
  styleUrl: './file-vizualize.component.less',
  standalone: true,
  imports: [
    TableModule,
    NgIf,
    PieChartComponent,
    BarChartComponent
  ],
  providers: []
})
export class FileVizualizeComponent implements OnInit {
  @ViewChild('dt') dt!: Table

  file$: Observable<IFileItem[]>;
  file!: IFileItem[];
  originalFile!: IFileItem[];
  sortedFile: IFileItem[] = [];
  isSorted: boolean | null = null;

  constructor(private store: Store) {
    this.file$ = this.store.select(selectActiveFile)
  }

  ngOnInit() {
    this.file$.subscribe((file) => {
      this.file = [...file]
      this.originalFile = [...file]
      this.sortedFile = [...file]
    })
  }
  closeFile () {
    this.store.dispatch(activeFileActions.closeActiveFile())
  }

  // customSort(event: SortEvent) {
  //   const field = event.field as 'category' | 'value'; // Поле для сортировки
  //   const order = event.order ?? 1; // Порядок сортировки (1 для возрастания, -1 для убывания)
  //
  //   // Создаем копию массива для сортировки
  //   const sortedData = [...this.file].sort((a: IFileItem, b: IFileItem) => {
  //     let value1: string | number;
  //     let value2: string | number;
  //
  //     if (field === 'category') {
  //       // Сортировка по категории (строки)
  //       value1 = a[field];
  //       value2 = b[field];
  //     } else if (field === 'value') {
  //       // Сортировка по значению (числа)
  //       value1 = a[field];
  //       value2 = b[field];
  //     } else {
  //       // Если field не 'category' или 'value', прекращаем сортировку
  //       return 0;
  //     }
  //
  //     // Логика сортировки
  //     if (value1 < value2) {
  //       return -1 * order;
  //     } else if (value1 > value2) {
  //       return 1 * order;
  //     } else {
  //       return 0;
  //     }
  //   });
  //
  //   // Обновляем локальную переменную
  //   this.file = sortedData;
  // }
  // resetSort() {
  //   this.file = [...this.originalFile]; // Возвращаем исходные данные
  // }
  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
      this.sortedFile = [...event.data!];
      console.log(this.sortedFile);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
      this.sortedFile = [...event.data!];
      console.log(this.sortedFile);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      // this.file = [...this.originalFile];
      console.log(this.file)
      this.sortedFile = [...this.originalFile];
      this.dt.reset();
    }
  }

  // sortTableData(event:SortEvent) {
  //   event.data.sort((data1, data2) => {
  //     let value1 = data1[event.field];
  //     let value2 = data2[event.field];
  //     let result = null;
  //     if (value1 == null && value2 != null) result = -1;
  //     else if (value1 != null && value2 == null) result = 1;
  //     else if (value1 == null && value2 == null) result = 0;
  //     else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
  //     else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
  //
  //     return event.order * result;
  //   });
  // }
  sortTableData(event:SortEvent) {
    event.data?.sort((data1: IFileItem, data2: IFileItem) => {
      let field = event.field as 'category' | 'value';
      let order = event.order ?? 1;

      let value1 = data1[field];
      let value2 = data2[field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return order * result;
    });
  }
}
