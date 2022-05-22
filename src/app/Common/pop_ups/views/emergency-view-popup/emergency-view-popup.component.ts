import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { EmergencyService } from 'src/app/services/emergency.service';

@Component({
  selector: 'app-emergency-view-popup',
  templateUrl: './emergency-view-popup.component.html',
  styleUrls: ['./emergency-view-popup.component.scss'],
})
export class EmergencyViewPopupComponent implements OnInit {
  Emergencies: any = [
    {
      // DB column name
      id: '',
      adminid: '',
      category: '',
      date: '',
      title: '',
      description: '',
      location: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: EmergencyService
  ) {
    this.Emergencies = data.Ealert;
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
      let filename = 'Emergency id-' + this.Emergencies.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }
}
