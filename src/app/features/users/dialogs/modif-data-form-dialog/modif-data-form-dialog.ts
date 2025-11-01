import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from '../../services/user-service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { ComunicationService } from '../../services/comunication-service';
import { ChangePasswordRequest } from '../../../../core/models/aplication-requests';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPassword')
  const passwordConfirm = control.get('newPasswordConfirm')
  if(password && passwordConfirm && password.value !== passwordConfirm.value) {
    return { passwordMismatch: true }
  }
  return null
}

@Component({
  selector: 'app-modif-data-form-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './modif-data-form-dialog.html',
  styleUrl: './modif-data-form-dialog.css'
})
export class ModifDataFormDialog implements OnInit {
  private userService = inject(UserApiService)
  private dialogRef = inject(MatDialogRef<FormDialog>)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComunicationService)

  openSnackBar() {
    this.snackBar.open('Contraseña modificada con exito!', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  form =  new FormGroup({
    login: new FormControl(''),
    newPassword: new FormControl('', Validators.required),
    newPasswordConfirm: new FormControl('', Validators.required)
  },
  { validators: passwordMatchValidator })

  ngOnInit(): void {
   this.resetFormWithLogin();
  }

  resetFormWithLogin() {
    const user = this.comunication.selectedUser();
    const loginValue = user?.user?.login ?? ''; 
    this.form.patchValue({
        login: loginValue,
        newPassword: '',
        newPasswordConfirm: ''
    });
  }

  modifData() {
    const request: ChangePasswordRequest = {
      login: String(this.comunication.selectedUser()?.user.login),
      newPassword: this.form.get('newPassword')?.value ?? '',
    }

    this.userService.modifPassAccessData(request).subscribe({
      next: () => {
        console.log('contra cambiada')
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

  submit() {
    if(!this.form.valid) return
    this.modifData()
  }

  close() {
    this.dialogRef.close()
  }
}
