import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { CrimeAreaService } from 'src/app/services/crime-area.service';

@Component({
  selector: 'app-c-area-view-popup',
  templateUrl: './c-area-view-popup.component.html',
  styleUrls: ['./c-area-view-popup.component.scss'],
})
export class CAreaViewPopupComponent implements OnInit {
  areas: any = [
    {
      // DB column name
      id: '',
      adminid: '',
      category: '',
      date: '',
      title: '',
      description: '',
      location: '',
      start_date_time: '',
      end_date_time: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CrimeAreaService
  ) {
    this.areas = data.area;
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
      let filename = 'Crime_Area id-' + this.areas.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }
}
