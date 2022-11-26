import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { RejectRemarksPopupComponent } from './reject-remarks-popup/reject-remarks-popup.component';
// generate pdf
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
} from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-complaint-view-popup',
  templateUrl: './complaint-view-popup.component.html',
  styleUrls: ['./complaint-view-popup.component.scss'],
})
export class ComplaintViewPopupComponent implements OnInit {
  complaintData: any = {
    id: '',
    userId: '',
    crimeType: '',
    subject: '',
    description: '',
    document: '',
    status: '',
    location: '',
    updatedAt: '',
    createdAt: '',
  };

  isReportMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private remark_popup: MatDialog,
    private service: ComplaintsService,
    private reportservice: ReportService
  ) {
    this.complaintData = data.complaint;
    this.isReportMode = data.isReportMode;
  }

  ngOnInit(): void {}

  rejectComplaint() {
    this.service
      .updateStatus({ status: 'Rejected' }, this.complaintData.id)
      .subscribe(
        (data) => {
          // this.generatePDF();
          this.createReport(this.complaintData.id);
        },
        (error) => {
          console.log(error);
        }
      );
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
      let filename = 'FIR_report id-' + this.complaintData.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }

  createReport(complaint_Id: number) {
    this.reportservice
      .createReport({ complaintId: complaint_Id, genaratedAT: Date.now() })
      .subscribe(
        (data) => {
          console.log('=======Delete response');
          console.log(data);
          this.complaintData = data;
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  acceptComplaint() {
    this.service
      .updateStatus({ status: 'Accepted' }, this.complaintData.id)
      .subscribe(
        (data) => {
          // this.generatePDF();
          this.createReport(this.complaintData.id);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
