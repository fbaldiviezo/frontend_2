import { DatePipe, NgClass } from '@angular/common';
import {
  Component,
  effect,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
export interface TableInterface {
  columnDef: string;
  header: string;
  cell: (row: any) => any;
}
@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginator,MatIconModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class TableComponent {
  data = input<any[]>([]);
  columns = input<TableInterface[]>([]);
  displayedColumns: any[] = [];
  dataSource: MatTableDataSource<any>;
  query = input<string>('');
  emitData = output<any>();

  onEdit = output()
  onDelete = output()
  onEnable = output()
  onRegisterData = output()
  onEditData = output()

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data());
  }

  loadData = effect(() => {
    this.displayedColumns = this.columns().map((c)=>c.columnDef)
    this.dataSource.data = this.data();    
  });

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter = effect(() => {
    this.dataSource.filter = this.query().trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  });
}