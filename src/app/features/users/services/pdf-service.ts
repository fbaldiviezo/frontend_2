import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = (pdfFonts as any).vfs;

@Injectable({providedIn: 'root'})
export class PdfGeneratorService {
    generateAndShowPdf(def: any) {
        pdfMake.createPdf(def).getBlob((blob) => {
            const url = URL.createObjectURL(blob)
            const iframe = document.getElementById('pdf-frame') as HTMLIFrameElement
            iframe.src = url
        })
    } 
}