import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ComplaintViewPopupComponent } from 'src/app/Common/pop_ups/views/complaint-view-popup/complaint-view-popup.component';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { view } from '../class/view';
import { RequestComponent } from '../request/request.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  ELEMENT_DATA: view[] = [];

  searchText: string;

  displayedColumns: string[] = [
    'crimeType',
    'updatedAt',
    'subject',
    'document',
    'location',
    'action',
    'status',
  ];

  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  dataSource = new MatTableDataSource<view>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private userStorageService: UserStorageService,
    private view_popup: MatDialog,
    public service: ComplaintsService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    this.AllComplaints();
    console.log(this.dataSource);
  }

  // Pop-Up
  request() {
    this.view_popup.open(RequestComponent, {
      height: 'auto',
      width: '50%',
    });
  }

  AllComplaints() {
    this.service.getAllComplaints().subscribe((data: any) => {
      let dataList = data.filter((o: any) => o.userId == this.user.userId);
      this.dataSource.data = dataList as view[];
      this.dataSource.paginator = this.paginator;
    });
  }
  // view
  viewUser(id: any) {
    const complaint = this.ELEMENT_DATA.filter(
      (dataObj: any) => dataObj.id == id
    );
    if (complaint.length == 0) return;
    this.view_popup.open(ComplaintViewPopupComponent, {
      data: {
        complaint: complaint[0],
      },
      height: 'auto',
      width: '60%',
    });
  }
  onEdit(element: any) {
    this.service.iniform(element);
    this.view_popup.open(RequestComponent, {
      height: 'auto',
      width: '50%',
    });
  }
  onDelete(element: any) {
    this.service.deleteComplaint(element.id).subscribe((data) => {
      this.dataSource.data = data;
      this.AllComplaints();
    });
  }

  getByStatus(status: any) {
    this.service.getComplaintByStatus(status).subscribe(
      (data: any) => {
        console.log('getByStatus\n' + data);
        let dataList = data.filter((o: any) => o.userId == this.user.userId);
        // this.displayedColumns = data;
        this.displayedColumns = dataList;
      },
      (error: any) => {
        console.error('ERROR\n' + error);
      }
    );
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
      pdf.save('UserInfo_report.pdf'); // Generated PDF
    });
  }
}
