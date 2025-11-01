import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MenusList } from "../menus-list/menus-list";
import { ProcessList } from '../process-list/process-list';
import { ComunicationMeproService } from '../../services/comunication-mepro-service';
import { MatDialog } from '@angular/material/dialog';
import { ProcesoApiResponse } from '../../../../../core/models/aplication-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeproRequest } from '../../../../../core/models/aplication-requests';
import { MeproService } from '../../services/mepro-service';

@Component({
  selector: 'app-rolme-main-page',
  imports: [MenusList, ProcessList],
  templateUrl: './mepro-main-page.html',
  styleUrl: './mepro-main-page.css'
})
export class MeproMainPage implements OnInit {
  private comunication = inject(ComunicationMeproService)
  private service = inject(MeproService)
  dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5

  queryMenu = signal<string>('')
  queryProcess = signal<string>('')
  selectedState: string = ''

  openSnackBar(message: string) {
    this.snackBar.open(message, 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  onRadioChanges(event:Event) {
    const selectedElement = event.target as HTMLInputElement
    this.selectedState = selectedElement.value
    console.log(this.selectedState)
    this.comunication.fetchFilteredProcess(Number(this.selectedState), Number(this.comunication.selectedMenu()?.codm)).subscribe({
      next: (data) => {
        this.comunication.process.set(data)
        console.log(data)
      }, 
      error: (err) => {
        console.log(err)        
      }
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

  fetchAllProcess() {
    this.comunication.fetchProcess().subscribe({
      next: (data) => {
        this.comunication.process.set(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  fetchProcessByMenu() {
    this.comunication.fetchProcessByMenu(Number(this.comunication.selectedMenu()?.codm)).subscribe({
      next: (data) => {
        this.comunication.process.set(data)
        console.log(data)
      }
    })
  }

  ngOnInit() {
    this.fetchAllMenus()
    this.fetchAllProcess()
  }

  handleProcessAssignment(event: {row: ProcesoApiResponse, checked: boolean}) {
    const selectedMenu = this.comunication.selectedMenu()
    const process = event.row
    const isChecked = event.checked
    //mira si se selecciono un menu
    if(!selectedMenu || !selectedMenu.codm) {
      this.openSnackBar('No se selecciono ningun menu')
      return
    }
    const mepro: MeproRequest = {
      codm: selectedMenu.codm,
      codp: process.codp,
    }
    if(isChecked) {
      this.service.insertMepro(mepro).subscribe({
        next:() => {
          this.openSnackBar('Asignado con exito')
          this.fetchProcessByMenu()
        }, 
        error: (err) => {
          console.log(err)
        }
      })
    } else {
      this.service.deleteMepro(mepro).subscribe({
        next: () => {
          this.openSnackBar('Desenlazado con exito')
          this.fetchProcessByMenu()
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  constructor() {
    effect(() => {
      const selectedMenu = this.comunication.selectedMenu()
      if(selectedMenu && selectedMenu.codm) {
        this.fetchProcessByMenu()
      }
    })
  }
}
