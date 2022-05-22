import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { MissedService } from 'src/app/services/missed.service';

@Component({
  selector: 'app-missed-view-popup',
  templateUrl: './missed-view-popup.component.html',
  styleUrls: ['./missed-view-popup.component.scss'],
})
export class MissedViewPopupComponent implements OnInit {
  misseds: any = [
    {
      id: '',
      adminid: '',
      category: '',
      identification: '',
      date: '',
      location: '',
      description: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MissedService
  ) {
    this.misseds = data.missed;
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
      let filename = 'Missed id-' + this.misseds.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }
}
