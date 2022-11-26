import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ComplaintViewPopupComponent } from 'src/app/Common/pop_ups/views/complaint-view-popup/complaint-view-popup.component';
import { ComplaintsService } from 'src/app/services/complaints.service';
// import { ReportService } from 'src/app/services/report.service';

import moment from 'moment'; // filter between
import { FormControl, FormGroup } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  apiBaseUrl = 'localhost:8081/';

  searchText: string;
  filtered_option: any;

  // filter(date_between)
  from_date: any;
  to_date: any;

  // current user role
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  userPoliceAddress = '';

  filterGroup = new FormGroup({
    searchtText: new FormControl(''),
    criteria: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });

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
    {
      name: 'Date',
      key: 'date',
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

  // After between filter
  complaintData_list: any = [
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
  userStorageService: any;

  constructor(
    private service: ComplaintsService,
    private userService: UserService,
    private view_popup: MatDialog,
    private reportservice: ReportService
  ) {}

  ngOnInit(): void {
    console.log('report component');
    this.user = JSON.parse(this.userStorageService.getUser());
    this.getAll();
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(this.user.userId).subscribe((data: any) => {
      console.log(data);
      this.userPoliceAddress = data.address;
    });
  }

  getAll() {
    this.reportservice.getAllReports().subscribe(
      (data: any) => {
        //  this.complaintData = data;
        let reportArray = [];

        reportArray = data;

        this.complaintData = [];
        this.complaintData_list = [];

        console.log('=========.complaintData_list');
        console.log(data);
        reportArray.map((item: any) => {
          this.complaintData.push(item.complaint);
          this.complaintData_list.push(item.complaint);
        });
        //complaint
        // filter between
        //  this.complaintData_list = data;
        // console.log('=========.complaintData_list');
        // console.log(this.complaintData_list);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  deleteReport(complaintId: any) {
    this.reportservice.deleteReport(complaintId).subscribe(
      (data) => {
        console.log('=======Delete response');
        console.log(data);
        this.complaintData = data;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  PrintReport(id: any) {
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

  // between filter
  dateSelected() {
    this.filterByBetweenDate();
  }

  filterByBetweenDate() {
    if (this.from_date != '' && this.to_date != '') {
      let filteredReports = this.complaintData.filter((r: any) => {
        return moment(r.date).isBetween(this.from_date, this.to_date);
      });
      this.complaintData_list = filteredReports;
    } else {
      this.complaintData_list = this.complaintData;
    }
  }

  clearDateBetweenFilter() {
    this.complaintData_list = this.complaintData;
    this.filterGroup.reset();
  }
}
