import { Component, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { ComunicationUsurolService } from '../../services/comunication-usurol-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleApiResponse } from '../../../../../core/models/aplication-response';
import { TableComponent } from "../../../../../shared/components/table/table";

@Component({
  selector: 'app-roles-list',
  imports: [TableComponent],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.css'
})
export class RolesList {
  private comunication = inject(ComunicationUsurolService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<RoleApiResponse>()
  displayedColumns: string[] = ["options", 'name']

  roles = signal<RoleApiResponse[]>([])
  query = input<string>('')
  rolesCheckChange = output<{ row: any, checked: boolean }>()

  columns = signal<any[]>([
    {
      columnDef: 'check-select',
      header: '#',
      cell: (r: RoleApiResponse) => '',
    },
    {
      columnDef: 'nombre',
      header: 'Lista de procesos',
      cell: (r: RoleApiResponse) => r.nombre,
    }
  ])

  constructor() {
    effect(() => {
      this.getRoles()
      const rolesList = this.comunication.roles() || []
      this.dataSource.data = rolesList
      const paginationInstance = this.paginator()
      if(paginationInstance) this.dataSource.paginator = paginationInstance
      if(this.dataSource.paginator) this.dataSource.paginator.firstPage()
    }, { allowSignalWrites: true })
  }

  getRoles() {
    this.roles.set(this.comunication.roles() ?? [])
  }

  //sin la notificacion de menus seleccionado para no mamadas
}
