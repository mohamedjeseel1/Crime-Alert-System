import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ComplaintViewPopupComponent } from 'src/app/Common/pop_ups/views/complaint-view-popup/complaint-view-popup.component';
import { ComplaintsService } from 'src/app/services/complaints.service';

@Component({
  selector: 'app-admin-complaint',
  templateUrl: './admin-complaint.component.html',
  styleUrls: ['./admin-complaint.component.scss'],
})
export class AdminComplaintComponent implements OnInit {
  apiBaseUrl = 'localhost:8081/';

  searchText: string;
  filtered_option: any;

  filter_options = [
    {
      name: 'ID',
      key: 'id',
    },

    {
      name: 'User Id',
      key: 'userId',
    },

    {
      name: 'Date',
      key: 'date',
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
      date: '',
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

  //  generate pdf

  // API
  constructor(
    private view_popup: MatDialog,
    private service: ComplaintsService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  // Pop-Up
  openDialog(id: any) {
    const complaint = this.complaintData.filter(
      (dataObj: any) => dataObj.id == id
    );
    if (complaint.length == 0) return;

    this.view_popup.open(ComplaintViewPopupComponent, {
      data: {
        complaint: complaint[0],
        isReportMode: false,
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAll() {
    this.service.getAllComplaints().subscribe((data: any) => {
      console.log(data);
      this.complaintData = data;
    });
  }

  deleteComplaint(id: any) {
    this.service.deleteComplaint(id).subscribe((data: any) => {
      alert('deleted');
      location.reload(); // will load data after relaod by ngOnInit()
    });
  }

  getByStatus(status: any) {
    this.service.getComplaintByStatus(status).subscribe(
      (data: any) => {
        console.log('getByStatus\n' + data);
        this.complaintData = data;
      },
      (error: any) => {
        console.error('ERROR\n' + error);
      }
    );
  }

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
      pdf.save('complaint_report.pdf'); // Generated PDF
    });
  }
}
