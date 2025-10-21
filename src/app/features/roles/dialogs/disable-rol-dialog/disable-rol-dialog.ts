import { Component, inject } from '@angular/core';
import { RolApiService } from '../../services/rol-service';
import { MatDialogRef } from '@angular/material/dialog';
import { ComunicationRolesService } from '../../services/comunications-roles-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-disable-rol-dialog',
  imports: [],
  templateUrl: './disable-rol-dialog.html',
  styleUrl: './disable-rol-dialog.css'
})
export class DisableRolDialog {
  private rolService = inject(RolApiService)
  private dialogRef = inject(MatDialogRef)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComunicationRolesService)

  openSnackBar() {
    this.snackBar.open('Eliminado con exito!', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  disableRol() {
    const codr = Number(this.comunication.selectedRole()?.codr)
    this.rolService.disableRol(codr, 0).subscribe({
      next: () => {
        console.log('eliminado')
        this.comunication.notifyRolesListRefresh()
        this.close()
        this.openSnackBar()
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  }

  close() {
    this.dialogRef.close()
  }
}
