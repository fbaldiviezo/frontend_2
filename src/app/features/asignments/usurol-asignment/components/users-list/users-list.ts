import { Component, effect, inject, input, OnDestroy, signal, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserApiResponse } from '../../../../../core/models/aplication-response';
import { ComunicationUsurolService } from '../../services/comunication-usurol-service';
import { TableComponent } from "../../../../../shared/components/table/table";

@Component({
  selector: 'app-users-list',
  imports: [TableComponent],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css'
})
export class UsersList implements OnDestroy {
  private comunication = inject(ComunicationUsurolService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<UserApiResponse>()
  displayedColumns: string[] = ['options', 'name']

  users = signal<UserApiResponse[]>([])
  query = input<string>('')

  columns = signal<any[]>([
    {
      columnDef: 'radio-select',
      header: '#',
      cell: (u: UserApiResponse) => u.login,
    },
    {
      columnDef: 'nombre',
      header: 'Lista de usuarios',
      cell: (u: UserApiResponse) => u.nombre,
    }
  ])

  constructor() {
    effect(() => {
      this.getUsers()
      const usersList = this.comunication.users() || []
      this.dataSource.data = usersList
      const paginationInstance = this.paginator()
      if(paginationInstance) this.dataSource.paginator = paginationInstance
      if(this.dataSource.paginator) this.dataSource.paginator.firstPage()
    }, { allowSignalWrites: true })
  }

  getUsers() {
    this.users.set(this.comunication.users() ?? [])
  }

  notifySelectedUser(u: any) {
    this.comunication.selectedUser.set(u)
    console.log(u)
  }

  ngOnDestroy() {
    this.comunication.selectedUser.set(null)
  }
}
