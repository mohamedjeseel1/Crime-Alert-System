import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { CriminalService } from 'src/app/services/criminal.service';

@Component({
  selector: 'app-wanted-criminal-view-popup',
  templateUrl: './wanted-criminal-view-popup.component.html',
  styleUrls: ['./wanted-criminal-view-popup.component.scss'],
})
export class WantedCriminalViewPopupComponent implements OnInit {
  filePath: string;

  criminals: any = [
    {
      id: '',
      crimeid: '',
      adminid: '',
      category: '',
      fullname: '',
      date: '',
      dob: '',
      nic: '',
      gender: '',
      pAddress: '',
      cAddress: '',
      image: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CriminalService
  ) {
    this.criminals = data.criminal;
  }

  ngOnInit(): void {
    console.log('=============================');

    console.log(this.criminals);
    // get image
    this.filePath = 'http://localhost:8081/' + this.criminals.image;
  }

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
      let filename = 'Wanted Criminal id-' + this.criminals.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }
}
