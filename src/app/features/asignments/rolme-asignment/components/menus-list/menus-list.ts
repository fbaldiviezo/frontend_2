import { Component, effect, inject, input, output, signal, viewChild } from '@angular/core';
import { ComunicationRolmeService } from '../../services/comunication-rolme-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MenuApiResponse } from '../../../../../core/models/aplication-response';
import { TableComponent } from '../../../../../shared/components/table/table';

@Component({
  selector: 'app-menus-list',
  imports: [TableComponent],
  templateUrl: './menus-list.html',
  styleUrl: './menus-list.css'
})
export class MenusList {
  private comunication = inject(ComunicationRolmeService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<MenuApiResponse>()
  displayedColumns: string[] = ["options", 'name']

  menus = signal<MenuApiResponse[]>([])
  query = input<string>('')
  menusCheckChange = output<{ row: any, checked: boolean }>()

  columns = signal<any[]>([
    {
      columnDef: 'check-select',
      header: '#',
      cell: (m: MenuApiResponse) => '',
    },
    {
      columnDef: 'nombre',
      header: 'Lista de procesos',
      cell: (m: MenuApiResponse) => m.nombre,
    }
  ])

  constructor() {
    effect(() => {
      this.getMenus()
      const menusList = this.comunication.menus() || []
      this.dataSource.data = menusList
      const paginationInstance = this.paginator()
      if(paginationInstance) this.dataSource.paginator = paginationInstance
      if(this.dataSource.paginator) this.dataSource.paginator.firstPage()
    }, { allowSignalWrites: true })
  }

  getMenus() {
    this.menus.set(this.comunication.menus() ?? [])
  }

  //utilidad en duda
  notifyMenusSelected(m: any) {
    this.comunication.selectedMenu.set(m)
    console.log(m)
  }
}
