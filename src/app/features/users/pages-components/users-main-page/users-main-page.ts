import { Component, effect, inject, OnDestroy, OnInit, output, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { RegisterFormDialog } from '../../dialogs/register-form-dialog/register-form-dialog';
import { UsersListPage } from "../users-list-page/users-list-page";
import { ComunicationService } from '../../services/comunication-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-main-page',
  imports: [MatIconModule, UsersListPage],
  templateUrl: './users-main-page.html',
  styleUrl: './users-main-page.css'
})
export class UsersMainPage implements OnInit, OnDestroy {
  private comunication = inject(ComunicationService)
  private refreshSubscription!: Subscription
  dialog = inject(MatDialog)

  onSearch = output<string>()
  query = signal<string>("")

  selectedType: string = ''
  selectedState: string = ''

  onSelectChanges(event: Event) {
    const selectedElement = event.target as HTMLSelectElement
    this.selectedType = selectedElement.value
    this.fetchFilteredUsers()
  }

  onRadioChanges(event: Event) {
    const selectedElement = event.target as HTMLInputElement
    this.selectedState = selectedElement.value
    this.fetchFilteredUsers()
  }

  ngOnInit() {
    this.fetchUsers()

    this.refreshSubscription = this.comunication.usersListRefresh$
      .subscribe(() => {
        this.fetchUsers()
      })
  }

  ngOnDestroy() {
      if(this.refreshSubscription) this.refreshSubscription.unsubscribe()
  }

  fetchUsers() {
    this.comunication.fetchUsers().subscribe({
        next: (data) => {
          this.comunication.users.set(data)
          console.log(data)
        },
        error: (err) => {
          console.log('error', err)
        }
    })
  }

  fetchFilteredUsers() {
    this.comunication.fetchFilteredUsers(this.selectedType, Number(this.selectedState)).subscribe({
      next: (data) => {
        this.comunication.users.set(data)
      },
      error: (err) => {
        console.log('hubo un error', err)
      }
    })
  }

  opneDialogPersonalRegister() {
    this.dialog.open(FormDialog, {data: { content:  RegisterFormDialog }})
  }
}
