import { Component, effect, inject, input, OnDestroy, signal, viewChild } from '@angular/core';
import { ComunicationMeproService } from '../../services/comunication-mepro-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MenuApiResponse } from '../../../../../core/models/aplication-response';
import { TableComponent } from "../../../../../shared/components/table/table";

@Component({
  selector: 'app-menus-list',
  imports: [TableComponent],
  templateUrl: './menus-list.html',
  styleUrl: './menus-list.css'
})
export class MenusList implements OnDestroy {
  private comunication = inject(ComunicationMeproService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<MenuApiResponse>()
  displayedColumns: string[] = ['options', 'name']

  menus = signal<MenuApiResponse[]>([])
  query = input<string>('')

  columns = signal<any[]>([
    {
      columnDef: 'radio-select',
      header: '#',
      cell: (m: MenuApiResponse) => m.codm,
    },
    {
      columnDef: 'nombre',
      header: 'Lista de menus',
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

  notifySelectedMenu(m: any) {
    this.comunication.selectedMenu.set(m)
    console.log(m)
  }

  ngOnDestroy(): void {
    this.comunication.selectedMenu.set(null)
  }
}
