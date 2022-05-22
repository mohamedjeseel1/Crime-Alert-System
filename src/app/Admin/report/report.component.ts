import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ComplaintViewPopupComponent } from 'src/app/Common/pop_ups/views/complaint-view-popup/complaint-view-popup.component';
import { ComplaintsService } from 'src/app/services/complaints.service';
// import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  apiBaseUrl = 'localhost:8081/';

  searchText: string;
  filtered_option: any;

  filter_options = [
    {
      name: 'ID',
      key: 'id',
    },

    {
      name: 'Category',
      key: 'crimeType',
    },
    {
      name: 'Location',
      key: 'location',
    },
  ];

  complaintData: any = [
    {
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
    },
  ];

  constructor(
    private service: ComplaintsService,
    private view_popup: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getComplaintByStatus('Accepted').subscribe((data: any) => {
      console.log(data);
      this.complaintData = data;
    });
  }

  generateReport(id: any) {
    const complaint = this.complaintData.filter(
      (dataObj: any) => dataObj.id == id
    );
    if (complaint.length == 0) return;

    this.view_popup.open(ComplaintViewPopupComponent, {
      data: {
        complaint: complaint[0],
        isReportMode: true,
      },
      height: 'auto',
      width: '50%',
    });
  }

  // generate with filter
  public GenerateReport() {
    let myCanvas = <HTMLCanvasElement>document.getElementById('print_mark');
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
      pdf.save('FIR_report.pdf'); // Generated PDF
    });
  }
}
