import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { StationService } from 'src/app/services/station.service';

@Component({
  selector: 'app-station-view',
  templateUrl: './station-view.component.html',
  styleUrls: ['./station-view.component.scss'],
})
export class StationViewComponent implements OnInit {
  station: any = [
    {
      id: '',
      adminid: '',
      Sname: '',
      district: '',
      branchCode: '',
      email: '',
      contact: '',
      date: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: StationService
  ) {
    this.station = data.station;
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
      let filename = 'Station id-' + this.station.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }
}
