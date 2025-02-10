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
  originalFile: IFileItem[] = [];
  sortedFile: IFileItem[] = [];
  isSorted: boolean | null = null;
  isFilter: boolean = false;

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
    this.isSorted = null;
    this.isFilter = false;
  }
  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
      this.sortedFile = [...event.data!];
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
      this.sortedFile = [...event.data!];
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.isFilter ? this.file = [...this.file] : this.file = [...this.originalFile];
      this.isFilter ? this.sortedFile = [...this.sortedFile] : this.sortedFile = [...this.originalFile];
      this.dt.reset();
    }
  }
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
  filterMinimalValue() {
    const minValue = Math.min(
      ...[...this.file].reduce((values: number[], { value }) => {
        values.push(value);
        return values;
      }, [])
    );
    const filtredFile = [...this.file].filter(({value}) => value != minValue);
    this.sortedFile = filtredFile;
    this.file = filtredFile;
    this.isFilter = true;
  }
  resetFilterMinimalValue() {
    this.sortedFile = [...this.originalFile];
    this.file = [...this.originalFile];
    this.isFilter = false;
  }
}
