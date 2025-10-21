import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-view',
  imports: [MatDialogModule],
  templateUrl: './pdf-view.html',
  styleUrl: './pdf-view.css'
})
export class PdfView {
  public safePdfUrl: SafeUrl

  constructor(@Inject(MAT_DIALOG_DATA) public data: { pdfUrl: string },
  private dialogRef: MatDialogRef<PdfView>,
  private sanitizer: DomSanitizer) {
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.pdfUrl)
  }

  printPdf() {
    const iframe = document.getElementById('pdf-frame') as HTMLIFrameElement
    iframe?.contentWindow?.print()
  }
  
  close() {
    this.dialogRef.close()
  }
}
