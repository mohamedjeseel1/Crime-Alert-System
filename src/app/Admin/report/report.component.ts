import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
}
