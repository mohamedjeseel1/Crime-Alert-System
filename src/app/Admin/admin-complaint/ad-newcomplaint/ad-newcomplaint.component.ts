import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComplaintViewPopupComponent } from 'src/app/Common/pop_ups/views/complaint-view-popup/complaint-view-popup.component';
import { ComplaintsService } from 'src/app/services/complaints.service';

@Component({
  selector: 'app-ad-newcomplaint',
  templateUrl: './ad-newcomplaint.component.html',
  styleUrls: ['./ad-newcomplaint.component.scss'],
})
export class AdNewcomplaintComponent implements OnInit {
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
}
