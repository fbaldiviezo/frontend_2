import { Component, inject } from '@angular/core';
import { RolApiService } from '../../services/rol-service';
import { MatDialogRef } from '@angular/material/dialog';
import { ComunicationRolesService } from '../../services/comunications-roles-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-enable-rol-dialog',
  imports: [],
  templateUrl: './enable-rol-dialog.html',
  styleUrl: './enable-rol-dialog.css'
})
export class EnableRolDialog {
  private rolService = inject(RolApiService)
  private dialogRef = inject(MatDialogRef)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComunicationRolesService)

  openSnackBar() {
    this.snackBar.open('Habilitado con exito!', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  enableRol() {
    const codr = Number(this.comunication.selectedRole()?.codr)
    this.rolService.enableRol(codr, 1).subscribe({
      next: () => {
        console.log('habilitado')
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
