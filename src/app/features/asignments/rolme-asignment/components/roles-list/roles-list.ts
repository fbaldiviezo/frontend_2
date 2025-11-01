import { Component, effect, inject, input, OnDestroy, signal, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleApiResponse } from '../../../../../core/models/aplication-response';
import { TableComponent } from "../../../../../shared/components/table/table";
import { ComunicationRolmeService } from '../../services/comunication-rolme-service';

@Component({
  selector: 'app-roles-list',
  imports: [TableComponent],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.css'
})
export class RolesList implements OnDestroy {
  private comunication = inject(ComunicationRolmeService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<RoleApiResponse>()
  displayedColumns: string[] = ['options', 'name']

  roles = signal<RoleApiResponse[]>([])
  query = input<string>('')

  columns = signal<any[]>([
    {
      columnDef: 'radio-select',
      header: '#',
      cell: (r: RoleApiResponse) => r.codr,
    },
    {
      columnDef: 'nombre',
      header: 'Lista de menus',
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
    }, {allowSignalWrites: true})
  }

  getRoles() {
    this.roles.set(this.comunication.roles() ?? [])
  }

  notifySelectedRole(r: any) {
    this.comunication.selectedRole.set(r)
    console.log(r)
  }

  ngOnDestroy() {
    this.comunication.selectedRole.set(null)
  }
}
