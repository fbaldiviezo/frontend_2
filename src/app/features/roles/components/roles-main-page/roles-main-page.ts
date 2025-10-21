import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RolesList } from "../roles-list/roles-list";
import { ComunicationRolesService } from '../../services/comunications-roles-service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { RegisterRolDialog } from '../../dialogs/register-rol-dialog/register-rol-dialog';

@Component({
  selector: 'app-roles-main-page',
  imports: [RolesList, MatIconModule],
  templateUrl: './roles-main-page.html',
  styleUrl: './roles-main-page.css'
})
export class RolesMainPage implements OnInit, OnDestroy {
  private comunication = inject(ComunicationRolesService)
  private refreshSubscription!: Subscription
  dialog = inject(MatDialog)

  query = signal<string>('')
  selectedState: string = ''

  onRadioChanges(event: Event) {
    const selectedElement = event.target as HTMLInputElement
    this.selectedState = selectedElement.value
    this.fetchFilteredRoles()
  }

  fetchAllRoles() {
    this.comunication.fetchRoles().subscribe({
      next: (data) => {
        this.comunication.roles.set(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchFilteredRoles() {
    this.comunication.fetchFilteredRole(Number(this.selectedState)).subscribe({
      next: (data) => {
        this.comunication.roles.set(data)
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  openDialogRolRegister() {
    this.dialog.open(FormDialog, {data: { content: RegisterRolDialog }})
  }

  ngOnInit() {
    this.fetchAllRoles()
    console.log(this.comunication.roles());
  
    this.refreshSubscription = this.comunication.rolesListRefresh$
      .subscribe(() => {
        this.fetchAllRoles()
      })
  }

  ngOnDestroy(): void {
    if(this.refreshSubscription) this.refreshSubscription.unsubscribe()
  }

}
