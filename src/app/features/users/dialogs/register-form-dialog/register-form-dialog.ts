import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { UserApiService } from '../../services/user-service';
import { MediaService } from '../../services/media-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterPersonalRequest } from '../../models/register-request';
import { ComunicationService } from '../../services/comunication-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-form-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form-dialog.html',
  styleUrl: './register-form-dialog.css'
})
export class RegisterFormDialog {
  private dialogRef = inject(MatDialogRef<FormDialog>)
  private userService = inject(UserApiService)
  private mediaService = inject(MediaService)
  private comunication = inject(ComunicationService)
  private selectedFile: File | null = null
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5

  openSnackBar() {
    this.snackBar.open('Persona registrada con exito!', 'cerrar', {
      duration: this.durationSeconts * 1000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  form = new FormGroup({
    cedula: new FormControl('', Validators.required),
    persona: new FormGroup({
      nombre: new FormControl('', Validators.required),
      ap: new FormControl('', Validators.required),
      am: new FormControl('', Validators.required),
      estado: new FormControl(1),
      fnac: new FormControl('', Validators.required),
      ecivil: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      direc: new FormControl('', Validators.required),
      telf: new FormControl('', Validators.required),
      tipo: new FormControl('', Validators.required),
      foto: new FormControl('')
    })
  })

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if(input.files && input.files.length > 0) {
      const file = input.files[0]
      this.selectedFile = file
      const photo = this.form.get('persona.foto')
      if(photo) {
        photo.setValue(file.name)
        photo.markAsDirty()
        photo.updateValueAndValidity()
      }
    } else {
      this.selectedFile = null
      this.form.get('persona.foto')?.setValue('')
      this.form.get('persona.foto')?.markAsDirty()
      this.form.get('persona.foto')?.updateValueAndValidity()
    }
  }

  registerPerson() {
    const registerData = this.form.value as unknown as RegisterPersonalRequest
    this.userService.registerUser(registerData).subscribe({
      next: (data) => {
        console.log(data)
        this.comunication.notifyUsersListRefresh()
        this.close()
        this.openSnackBar()
      },
      error: (err) => {
        console.log('Error al registrar', err)
        this.close()
      }
    })
  }

  submit() {
    if(this.form.invalid) return
    const photoControl = this.form.get('persona.foto')
    if(this.selectedFile) {
      this.mediaService.uploadPhoto(this.selectedFile).subscribe({
        next: (response) => {
          const photoUrl = response.url
          if(photoControl) photoControl.setValue(photoUrl)
          this.registerPerson()
        }, 
        error: (err) => {
          console.log('error al subir la foto, anulando registro')
        }
      })
    } else {
      this.registerPerson()
    }
  }

  close() {
    this.dialogRef.close()
    this.form.reset()
  }
}
