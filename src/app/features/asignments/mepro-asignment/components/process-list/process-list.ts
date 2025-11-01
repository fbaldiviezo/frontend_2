import { Component, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { ComunicationMeproService } from '../../services/comunication-mepro-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProcesoApiResponse } from '../../../../../core/models/aplication-response';
import { TableComponent } from "../../../../../shared/components/table/table";

@Component({
  selector: 'app-process-list',
  imports: [TableComponent],
  templateUrl: './process-list.html',
  styleUrl: './process-list.css'
})
export class ProcessList {
  private comunication = inject(ComunicationMeproService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<ProcesoApiResponse>()
  displayedColumns: string[] = ["options", 'name']
  
  process = signal<ProcesoApiResponse[]>([])
  query = input<string>('')
  processCheckChange = output<{ row: any, checked: boolean }>()

  columns = signal<any[]>([
    {
      columnDef: 'check-select',
      header: '#',
      cell: (p: ProcesoApiResponse) => '',
    },
    {
      columnDef: 'nombre',
      header: 'Lista de procesos',
      cell: (p: ProcesoApiResponse) => p.nombre,
    }
  ])

  constructor() {
    effect(() => {
      this.getProcess()
      const processList = this.comunication.process() || []
      this.dataSource.data = processList
      const paginationInstance = this.paginator()
      if(paginationInstance) this.dataSource.paginator = paginationInstance
      if(this.dataSource.paginator) this.dataSource.paginator.firstPage()
    }, { allowSignalWrites: true })
  }

  getProcess() {
    this.process.set(this.comunication.process() ?? [])
  }

  notifyProcessSelected(p: any) {
    this.comunication.selectedProcess.set(p)
    console.log(p)
  }
}
