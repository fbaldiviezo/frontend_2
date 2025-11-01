import { Component, inject, OnInit } from '@angular/core';
import { RolApiService } from '../../services/rol-service';
import { MatDialogRef } from '@angular/material/dialog';
import { ComunicationRolesService } from '../../services/comunications-roles-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolRequest } from '../../../../core/models/aplication-requests';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modify-rol-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-rol-dialog.html',
  styleUrl: './modify-rol-dialog.css'
})
export class ModifyRolDialog implements OnInit {
  private rolService = inject(RolApiService)
  private dialogRef = inject(MatDialogRef)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComunicationRolesService)

  openSnackBar() {
    this.snackBar.open('Modificado con exito!', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required)
  })

  modifyRol() {
    const rol: RolRequest = {
      nombre: this.form.get('name')?.value ?? '',
      estado: 1
    }
    this.rolService.updateRol(rol, Number(this.comunication.selectedRole()?.codr)).subscribe({
      next: () => {
        console.log('modificado con exito')
        this.comunication.notifyRolesListRefresh()
        this.close()
        this.openSnackBar()
      },
      error: (err) => {
        console.log('error', err)
        this.close()
      }
    })
  }

  submit() {
    if(this.form.errors) return
    this.modifyRol()
  }

  ngOnInit() {
      this.resetForm()
  }

  resetForm() {
    const rolName = this.comunication.selectedRole()?.nombre
    this.form.patchValue({
      name: rolName
    })
  }

  close() {
    this.dialogRef.close()
  }
}
