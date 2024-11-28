import { Injectable } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfserviceService {

  constructor() { }
  generatePdf(contentId: string, options?: any) {
    const content: HTMLElement = document.getElementById(contentId) as HTMLElement;

    html2canvas(content).then((canvas) => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('dashboard.pdf');
    });
}
}