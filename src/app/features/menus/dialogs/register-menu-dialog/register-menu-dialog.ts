import { Component, inject } from '@angular/core';
import { MenuApiService } from '../../services/menu-service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComnunicationMenusService } from '../../services/comunications-menus-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MenuRequest } from '../../../../core/models/aplication-requests';

@Component({
  selector: 'app-register-menu-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './register-menu-dialog.html',
  styleUrl: './register-menu-dialog.css'
})
export class RegisterMenuDialog {
  private menuService = inject(MenuApiService)
  private dialogRef =  inject(MatDialogRef<FormDialog>)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComnunicationMenusService)

  openSnackBar() {
    this.snackBar.open('Registrado con exito', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['bg-green-700'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  addMenu() {
    const menu: MenuRequest = {
      nombre: this.form.get('name')?.value ?? '',
      estado: 1
    }
    this.menuService.insertMenu(menu).subscribe({
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

  submit() {
    if(this.form.invalid) return 
    this.addMenu()
  }

  close() {
    this.dialogRef.close()
  }
}
