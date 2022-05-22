import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { CrimeService } from 'src/app/services/crime.service';

@Component({
  selector: 'app-crime-view-popup',
  templateUrl: './crime-view-popup.component.html',
  styleUrls: ['./crime-view-popup.component.scss'],
})
export class CrimeViewPopupComponent implements OnInit {
  crimes: any = [
    {
      id: '',
      adminid: '',
      category: '',
      title: '',
      description: '',
      lawOfCrime: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CrimeService
  ) {
    this.crimes = data.crime;
  }

  ngOnInit(): void {}

  // generate pdf
  // myCanvas: HTMLCanvasElement;
  public generatePDF() {
    let myCanvas = <HTMLCanvasElement>(
      document.getElementById('contentToConvert')
    );
    html2canvas(myCanvas).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      let filename = 'Crime id-' + this.crimes.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }
}
