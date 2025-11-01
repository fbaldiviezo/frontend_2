import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ComunicationRolmeService } from '../../services/comunication-rolme-service';
import { RolmeService } from '../../services/rolme-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuApiResponse } from '../../../../../core/models/aplication-response';
import { RolmeRequest } from '../../../../../core/models/aplication-requests';
import { RolesList } from "../roles-list/roles-list";
import { MenusList } from "../menus-list/menus-list";

@Component({
  selector: 'app-rolme-main-page',
  imports: [RolesList, MenusList],
  templateUrl: './rolme-main-page.html',
  styleUrl: './rolme-main-page.css'
})
export class RolmeMainPage implements OnInit {
  private comunication = inject(ComunicationRolmeService)
  private service = inject(RolmeService)
  dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  
  queryRole = signal<string>('')
  queryMenu = signal<string>('')
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
    console.log(this.selectedState)
    this.comunication.fetchFilteredMenus(Number(this.selectedState), Number(this.comunication.selectedRole()?.codr)).subscribe({
      next: (data) => {
        this.comunication.menus.set(data)
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

  fetchMenusByRole() {
    this.comunication.fetchMenusByRole(Number(this.comunication.selectedRole()?.codr)).subscribe({
      next: (data) => {
        this.comunication.menus.set(data)
        console.log(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit() {
    this.fetchAllRoles()
    this.fetchAllMenus()
  }

  handleMenusAssignment(event: {row: MenuApiResponse, checked: boolean}) {
    const selectedRole = this.comunication.selectedRole()
    const menu = event.row
    const isChecked = event.checked
    if(!selectedRole || !selectedRole.codr) {
      this.openSnackBar('No se selecciono ningun rol')
      return
    }
    const rolme: RolmeRequest = {
      codr: selectedRole.codr,
      codm: menu.codm,
    }
    if(isChecked) {
      this.service.insertRolme(rolme).subscribe({
        next: () => {
          this.openSnackBar('Asignado con exito')
          this.fetchMenusByRole()
        },
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this.service.deleteRolme(rolme).subscribe({
        next: () => {
          this.openSnackBar('Desenlazado con exito')
          this.fetchMenusByRole()
        }, 
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  constructor() {
    effect(() => {
      const selectedRole = this.comunication.selectedRole()
      if(selectedRole && selectedRole.codr) {
        this.fetchMenusByRole()
      }
    })
  }
}
