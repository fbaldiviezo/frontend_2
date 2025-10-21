import { Component, inject } from '@angular/core';
import { MenuApiService } from '../../services/menu-service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComnunicationMenusService } from '../../services/comunications-menus-service';

@Component({
  selector: 'app-enable-menu-dialog',
  imports: [],
  templateUrl: './enable-menu-dialog.html',
  styleUrl: './enable-menu-dialog.css'
})
export class EnableMenuDialog {
  private menuService = inject(MenuApiService)
  private dialogRef = inject(MatDialogRef)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComnunicationMenusService)

  openSnackBar() {
    this.snackBar.open('Habilitado con exito', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  enableMenu() {
    const codm = Number(this.comunication.selectedMenu()?.codm)
    this.menuService.enableMenu(codm, 1).subscribe({
      next: () => {
        this.comunication.notifyMenusListRefresh()
        this.close()
        this.openSnackBar()
      },
      error: (err) => {
        console.log(err)
        this.close()
      }
    })
  }

  close() {
    this.dialogRef.close()
  }
}
