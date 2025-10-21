import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ComnunicationMenusService } from '../../services/comunications-menus-service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { RegisterMenuDialog } from '../../dialogs/register-menu-dialog/register-menu-dialog';
import { MenusListPage } from '../menus-list-page/menus-list-page';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menus-main-page',
  imports: [MatIconModule, MenusListPage],
  templateUrl: './menus-main-page.html',
  styleUrl: './menus-main-page.css'
})
export class MenusMainPage implements OnInit, OnDestroy {
  private comunication = inject(ComnunicationMenusService)
  private refreshSubscription!: Subscription
  dialog = inject(MatDialog)

  query = signal<string>('')
  selectedState: string = ''

  onRadioChanges(event: Event) {
    const selectedElement = event.target as HTMLInputElement
    this.selectedState = selectedElement.value
    this.fetchFilteredMenus()
  }

  fetchAllMenus() {
    this.comunication.fetchMenus().subscribe({
      next: (data) => {
        this.comunication.menus.set(data)
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchFilteredMenus() {
    this.comunication.fetchFilteredMenus(Number(this.selectedState)).subscribe({
      next: (data) => {
        this.comunication.menus.set(data)
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  openDialogRegister() {
    this.dialog.open(FormDialog, {data: { content: RegisterMenuDialog }})
  }  

  ngOnInit() {
    this.fetchAllMenus()
    console.log(this.comunication.menus)
    this.refreshSubscription = this.comunication.menusListRefresh$
      .subscribe(() => {
        this.fetchAllMenus()
      })
  }

  ngOnDestroy() {
      if(this.refreshSubscription) this.refreshSubscription.unsubscribe()
  }
}
