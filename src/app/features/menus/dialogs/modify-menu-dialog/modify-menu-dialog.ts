import { Component, inject, OnInit } from '@angular/core';
import { MenuApiService } from '../../services/menu-service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComnunicationMenusService } from '../../services/comunications-menus-service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MenuRequest } from '../../models/menu-request';

@Component({
  selector: 'app-modify-menu-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-menu-dialog.html',
  styleUrl: './modify-menu-dialog.css'
})
export class ModifyMenuDialog implements OnInit {
  private menuService = inject(MenuApiService)
  private dialogRef = inject(MatDialogRef)
  private snackBar = inject(MatSnackBar)
  private durationSeconts = 5
  comunication = inject(ComnunicationMenusService)

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

  modifyMenu() {
    const menu: MenuRequest = {
      nombre: this.form.get('name')?.value ?? '',
      estado: 1,
    }
    this.menuService.updateMenu(Number(this.comunication.selectedMenu()?.codm), menu).subscribe({
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

  resetForm() {
    this.form.patchValue({
      name: this.comunication.selectedMenu()?.nombre
    })
  }

  submit() {
    if(this.form.invalid) return
    this.modifyMenu()
  }

  ngOnInit() {
      this.resetForm()
  }

  close() {
    this.dialogRef.close()
  }
}
