import { Component, effect, inject, input, signal, ViewChild, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ComunicationService } from '../../services/comunication-service';
import { Persona } from '../../../../core/models/user-data';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { DisableUserDialog } from '../../dialogs/disable-user-dialog/disable-user-dialog';
import { ConfirmationDialog } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog';
import { EnableUserDialog } from '../../dialogs/enable-user-dialog/enable-user-dialog';
import { RegisterDataFormDialog } from '../../dialogs/register-data-form-dialog/register-data-form-dialog';
import { ModifDataFormDialog } from '../../dialogs/modif-data-form-dialog/modif-data-form-dialog';
import { ModifUserFormDialog } from '../../dialogs/modif-user-form-dialog/modif-user-form-dialog';
import { TableComponent } from "../../../../shared/components/table/table";

@Component({
  selector: 'app-users-list-page',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, TableComponent],
  templateUrl: './users-list-page.html',
  styleUrl: './users-list-page.css'
})
export class UsersListPage {
  private comunication = inject(ComunicationService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<Persona>()
  displayedColumns: string[] = ['photo', 'name', 'state', 'actions']
  dialog = inject(MatDialog)

  usuarios = signal<Persona[]>([])

  query = input<string>("")

  columns=signal<any[]>([
    {
      columnDef: 'foto',
      header: 'Foto',
      cell: (p: Persona) => p.foto,
    },
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (p: Persona) => p.nombre + ' ' + p.ap + ' ' + p.am,
    },
    {
      columnDef: 'estado',
      header: 'Estado',
      cell: (p: Persona) => p.estado,
    },
    {
      columnDef: 'm',
      header: 'M',
      cell: (p: Persona) => "",
    },
    {
      columnDef: 'b',
      header: 'B',
      cell: (p: Persona) => "",
    },
    {
      columnDef: 'h',
      header: 'H',
      cell: (p: Persona) => "",
    },
    {
      columnDef: 'v',
      header: 'V',
      cell: (p: Persona) => "",
    },
    {
      columnDef: 'k',
      header: 'K',
      cell: (p: Persona) => p.user,
    },
  ]) 

  constructor() {
    effect(() => {
      this.obtenerPersonas()
      const usersList = this.comunication.users() || []
      this.dataSource.data = usersList
      const paginationInstance = this.paginator()
      if(paginationInstance) this.dataSource.paginator = paginationInstance
      if(this.dataSource.paginator) this.dataSource.paginator.firstPage()
    }, { allowSignalWrites: true })
  }

  obtenerPersonas(){
    this.usuarios.set(this.comunication.users()??[])
    console.log("usuarios",this.usuarios());
  }

  edit(p :any){
    this.comunication.selectedUser.set(p)
    this.dialog.open(FormDialog, {data: { content: ModifUserFormDialog }})
  }

  delete(p: any) {
    this.comunication.selectedUser.set(p)
    this.dialog.open(ConfirmationDialog, {data: { content: DisableUserDialog }})
  }

  enable(p: any) {
    this.comunication.selectedUser.set(p)
    this.dialog.open(ConfirmationDialog, {data: { content: EnableUserDialog }})
  }

  registerData(p: any) {
    this.comunication.selectedUser.set(p)
    this.dialog.open(FormDialog, {data: { content: RegisterDataFormDialog }})
  }

  editData(p: any) {
    this.comunication.selectedUser.set(p)
    this.dialog.open(FormDialog, {data: { content: ModifDataFormDialog }})
  }
}
