import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ComunicationUsurolService } from '../../services/comunication-usurol-service';
import { UsurolService } from '../../services/usurol-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleApiResponse } from '../../../../../core/models/aplication-response';
import { UsurolRequest } from '../../../../../core/models/aplication-requests';
import { UsersList } from "../users-list/users-list";
import { RolesList } from "../roles-list/roles-list";

@Component({
  selector: 'app-usurol-main-page',
  imports: [UsersList, RolesList],
  templateUrl: './usurol-main-page.html',
  styleUrl: './usurol-main-page.css'
})
export class UsurolMainPage implements OnInit {
  private comunication = inject(ComunicationUsurolService)
  private service = inject(UsurolService)
  dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5

  queryUser = signal<string>('')
  queryRole = signal<string>('')
  selectedState: string = ''

  openSnackBar(message: string) {
    this.snackBar.open(message, 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  onRadioChanges(event: Event) {
    const selectedElement = event.target as HTMLInputElement
    this.selectedState = selectedElement.value
    this.comunication.fetchFilteredRoles(Number(this.selectedState), String(this.comunication.selectedUser()?.login)).subscribe({
      next: (data) => {
        this.comunication.roles.set(data)
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchAllUsers() {
    this.comunication.fetchUsers().subscribe({
      next: (data) => {
        this.comunication.users.set(data)
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchAllRoles() {
    this.comunication.fetchRoles().subscribe({
      next: (data) => {
        this.comunication.roles.set(data)
      },
      error: (err) => [
        console.log(err)
      ]
    })
  }

  fetchRolesByUser() {
    this.comunication.fetchRolesByUser(String(this.comunication.selectedUser()?.login)).subscribe({
      next: (data) => {
        this.comunication.roles.set(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit(): void {
    this.fetchAllUsers()
    this.fetchAllRoles()
  }

  handleRolesAssignment(event: {row: RoleApiResponse, checked: boolean}) {
    const selectedUser = this.comunication.selectedUser()
    const rol = event.row
    const isChecked = event.checked
    if(!selectedUser || !selectedUser.login) {
      this.openSnackBar('No se encontro ningun usuario')
      return
    }
    const usurol: UsurolRequest = {
      login: selectedUser.login,
      codr: rol.codr,
    }
    if(isChecked) {
      this.service.insertUsurol(usurol).subscribe({
        next: () => {
          this.openSnackBar('Asignado con exito')
          this.fetchRolesByUser()
        }, 
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this.service.deleteUsurol(usurol).subscribe({
        next: (data) => {
          this.openSnackBar('Desenlazado con exito')
          this.fetchRolesByUser()
        }, 
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  constructor() {
    effect(() => {
      const selectedUser = this.comunication.selectedUser()
      if(selectedUser && selectedUser.login) {
        this.fetchRolesByUser()
      }
    })
  }
}
