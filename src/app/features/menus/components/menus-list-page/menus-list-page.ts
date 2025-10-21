import { Component, effect, inject, input, signal, viewChild } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table";
import { ComnunicationMenusService } from '../../services/comunications-menus-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Menus } from '../../models/menu-response';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { ModifyMenuDialog } from '../../dialogs/modify-menu-dialog/modify-menu-dialog';
import { ConfirmationDialog } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog';
import { DisableMenuDialog } from '../../dialogs/disable-menu-dialog/disable-menu-dialog';
import { EnableMenuDialog } from '../../dialogs/enable-menu-dialog/enable-menu-dialog';

@Component({
  selector: 'app-menus-list-page',
  imports: [TableComponent],
  templateUrl: './menus-list-page.html',
  styleUrl: './menus-list-page.css'
})
export class MenusListPage {
  private comunication = inject(ComnunicationMenusService)
  paginator = viewChild(MatPaginator)
  dataSource = new MatTableDataSource<Menus>()
  displayedColumns: string[] = ['name', 'state', 'actions']
  dialog = inject(MatDialog)

  menus = signal<Menus[]>([])
  query = input<string>('')

  columns = signal<any[]>([
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: Menus) => m.nombre,
    },
    {
      columnDef: 'estado',
      header: 'Estado',
      cell: (m: Menus) => m.estado,
    },
    {
      columnDef: 'm',
      header: 'M',
      cell: (m: Menus) => '',
    },
    {
      columnDef: 'b',
      header: 'B',
      cell: (m: Menus) => '',
    },
    {
      columnDef: 'h',
      header: 'H',
      cell: (m: Menus) => '',
    },
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

  modifyMenu(m: any) {
    this.comunication.selectedMenu.set(m)
    this.dialog.open(FormDialog, {data: { content: ModifyMenuDialog }})
  }

  disableMenu(m: any) {
    this.comunication.selectedMenu.set(m)
    this.dialog.open(ConfirmationDialog, {data: { content: DisableMenuDialog }})
  }

  enableMenu(m: any) {
    this.comunication.selectedMenu.set(m)
    this.dialog.open(ConfirmationDialog, {data: { content: EnableMenuDialog }})
  }
}
