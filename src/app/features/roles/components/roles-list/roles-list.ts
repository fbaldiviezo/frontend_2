import { Component, effect, inject, input, signal, viewChild } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table";
import { ComunicationRolesService } from '../../services/comunications-roles-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RoleApiResponse } from '../../../../core/models/aplication-response';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { ModifyRolDialog } from '../../dialogs/modify-rol-dialog/modify-rol-dialog';
import { DisableRolDialog } from '../../dialogs/disable-rol-dialog/disable-rol-dialog';
import { ConfirmationDialog } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog';
import { EnableRolDialog } from '../../dialogs/enable-rol-dialog/enable-rol-dialog';

@Component({
  selector: 'app-roles-list',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, TableComponent],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.css'
})
export class RolesList {
  private comunication = inject(ComunicationRolesService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<RoleApiResponse>()
  displayedColumns: string[] = ['name', 'state', 'actions']
  dialog = inject(MatDialog)

  roles = signal<RoleApiResponse[]>([])
  query = input<string>("")

  columns = signal<any[]>([
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (r: RoleApiResponse) => r.nombre,
    },
    {
      columnDef: 'estado',
      header: 'Estado',
      cell: (r: RoleApiResponse) => r.estado,
    },
    {
      columnDef: 'm',
      header: 'M',
      cell: (r: RoleApiResponse) => '',
    },
    {
      columnDef: 'b',
      header: 'B',
      cell: (r: RoleApiResponse) => '',
    },
    {
      columnDef: 'h',
      header: 'H',
      cell: (r: RoleApiResponse) => '',
    },
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
    console.log(this.roles())
  }

  modifyRol(r: any) {
    this.comunication.selectedRole.set(r)
    this.dialog.open(FormDialog, {data: { content: ModifyRolDialog }})
  }

  disableRol(r: any) {
    this.comunication.selectedRole.set(r)
    this.dialog.open(ConfirmationDialog, {data: { content: DisableRolDialog }})
  }

  enableRol(r: any) {
    this.comunication.selectedRole.set(r)
    this.dialog.open(ConfirmationDialog, {data: { content: EnableRolDialog }})
  }
}
