import { Component, inject } from '@angular/core';
import { UserApiService } from '../../services/user-service';
import { ComunicationService } from '../../services/comunication-service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialog } from '../../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-enable-user-dialog',
  imports: [],
  templateUrl: './enable-user-dialog.html',
  styleUrl: './enable-user-dialog.css'
})
export class EnableUserDialog {
  private userService = inject(UserApiService)
  comunication = inject(ComunicationService)
  private dialogRef = inject(MatDialogRef<ConfirmationDialog>)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5

  openSnackBar() {
    this.snackBar.open('Habilitado con exito!', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['bg-white'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  enableUser() {
    const codp = Number(this.comunication.selectedUser()?.codp)
    this.userService.enableUser(codp, 1).subscribe({
      next: () => {
        console.log('usuario habilitado')
        this.comunication.notifyUsersListRefresh()
        this.close()
        this.openSnackBar()
      }, 
      error: () => {
        console.log('hubo un error')
        this.close()
      }
    })
  }

  close() {
    this.dialogRef.close()
  }
}
