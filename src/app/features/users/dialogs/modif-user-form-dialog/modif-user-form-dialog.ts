import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormDialog } from '../../../../shared/components/dialogs/form-dialog/form-dialog';
import { UserApiService } from '../../services/user-service';
import { MediaService } from '../../services/media-service';
import { ComunicationService } from '../../services/comunication-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PersonalData2 } from '../../../../core/models/aplication-requests';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modif-user-form-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './modif-user-form-dialog.html',
  styleUrl: './modif-user-form-dialog.css'
})
export class ModifUserFormDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<FormDialog>)
  private userService = inject(UserApiService)
  private mediaService = inject(MediaService)
  private selectedFile: File | null = null
  comunication = inject(ComunicationService)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5

  openSnackBar() {
    this.snackBar.open('Persona modificada con exito!', 'cerrar', {
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

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
  const selectedUser = this.comunication.selectedUser();
  if (!selectedUser) {
    console.warn('No hay usuario seleccionado');
    return;
  }
  const fecha = new Date(selectedUser.fnac)
  const iso = fecha.toISOString().substring(0, 10);

  this.form.patchValue({
    cedula: selectedUser.datos?.id?.cedula || '',
    persona: {
      nombre: selectedUser.nombre || '',
      ap: selectedUser.ap || '',
      am: selectedUser.am || '',
      estado: selectedUser.estado ?? 1,
      fnac: iso || '',
      ecivil: selectedUser.ecivil || '',
      genero: selectedUser.genero || '',
      direc: selectedUser.direc || '',
      telf: selectedUser.telf || '',
      tipo: selectedUser.tipo || '',
      foto: selectedUser.foto || ''
    }
  });
  this.form.markAsPristine();
  this.form.markAsUntouched();
}



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

  updatePerson() {
      const registerData: PersonalData2 = {
        oldCedula: String(this.comunication.selectedUser()?.datos.id.cedula),
        newCedula: this.form.get('cedula')?.value ?? String(this.comunication.selectedUser()?.datos.id.cedula),
        codp: this.comunication.selectedUser()?.codp ?? 0,
        nombre: this.form.get('persona.nombre')?.value ?? '',
        ap: this.form.get('persona.ap')?.value ?? '',
        am: this.form.get('persona.am')?.value ?? '',
        estado: this.form.get('persona.estado')?.value ?? 1,
        fnac: new Date(this.form.get('persona.fnac')?.value ?? ''),
        ecivil: this.form.get('persona.ecivil')?.value ?? '',
        genero: this.form.get('persona.genero')?.value ?? '',
        direc: this.form.get('persona.direc')?.value ?? '',
        telf: this.form.get('persona.telf')?.value ?? '',
        tipo: this.form.get('persona.tipo')?.value ?? '',
        foto: this.form.get('persona.foto')?.value ?? '',
      }

      console.log(registerData);

      this.userService.updatePersonal(registerData, Number(this.comunication.selectedUser()?.codp)).subscribe({
        next: (data) => {
          console.log(data)
          this.comunication.notifyUsersListRefresh()
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
      if(!this.form.valid) return
      const photoControl = this.form.get('persona.foto')
      if(this.selectedFile) {
        this.mediaService.uploadPhoto(this.selectedFile).subscribe({
          next: (response) => {
            const photoUrl = response.url
            if(photoControl) photoControl.setValue(photoUrl)
            this.updatePerson()
          }, 
          error: (err) => {
            console.log('error al subir la foto, anulando registro')
          }
        })
      } else {
        this.updatePerson()
      }
    }

    close() {
      this.dialogRef.close()
      this.form.reset()
    }
}
