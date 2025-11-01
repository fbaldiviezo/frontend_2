import { Component, inject } from '@angular/core';
import { RolApiService } from '../../services/rol-service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, RangeValueAccessor } from '@angular/forms';
import { RolRequest } from '../../../../core/models/aplication-requests';
import { ComunicationRolesService } from '../../services/comunications-roles-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-rol-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './register-rol-dialog.html',
  styleUrl: './register-rol-dialog.css'
})
export class RegisterRolDialog {
  private rolService = inject(RolApiService)
  private dialogRef = inject(MatDialogRef<FormDialog>)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComunicationRolesService)

  openSnackBar() {
    this.snackBar.open('Registrado con exito!', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  addRol() {
    const rol: RolRequest = {
      nombre: this.form.get('name')?.value ?? '',
      estado: 1
    }
    console.log(rol);
    this.rolService.insertRol(rol).subscribe({
      next: (data) => {
        console.log('Rol ', data.nombre, ' añadido')
        this.comunication.notifyRolesListRefresh()
        this.close()
        this.openSnackBar()
      },
      error: (err) => {
        console.log('error ', err)
        this.close()
      }
    })
  }

  submit() {
    if(this.form.invalid) return
    this.addRol()
  }

  close() {
    this.dialogRef.close()
  }
}
