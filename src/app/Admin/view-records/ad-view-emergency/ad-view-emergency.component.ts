import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { EmergencyEditPopupComponent } from 'src/app/Common/pop_ups/edits/emergency-edit-popup/emergency-edit-popup.component';
import { EmergencyViewPopupComponent } from 'src/app/Common/pop_ups/views/emergency-view-popup/emergency-view-popup.component';
import { EmergencyService } from 'src/app/services/emergency.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-view-emergency',
  templateUrl: './ad-view-emergency.component.html',
  styleUrls: ['./ad-view-emergency.component.scss'],
})
export class AdViewEmergencyComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

  searchText: string;
  filtered_option: any;

  filter_options = [
    {
      name: 'ID',
      key: 'id',
    },
    {
      name: 'Date',
      key: 'date',
    },
    {
      name: 'Category',
      key: 'category',
    },

    {
      name: 'Location',
      key: 'location',
    },
  ];
  Emergencies: any = [
    {
      // DB column name
      id: '',
      adminid: '',
      category: '',
      date: '',
      title: '',
      description: '',
      location: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  constructor(
    private view_popup: MatDialog,
    private emergency: EmergencyService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.logged_user_role = JSON.parse(this.userStorageService.getUser()).role;
    this.getAllEmergencies();
  }

  // Pop-Up
  openDialog(id: any) {
    const Ealert = this.Emergencies.filter((dataObj: any) => dataObj.id == id);
    if (Ealert.length == 0) return;
    this.view_popup.open(EmergencyViewPopupComponent, {
      data: {
        Ealert: Ealert[0],
      },
      height: 'auto',
      width: '100%',
    });
  }

  edit(id: any) {
    const alert = this.Emergencies.filter((dataObj: any) => dataObj.id == id);
    if (alert.length == 0) return;

    this.view_popup.open(EmergencyEditPopupComponent, {
      data: {
        alert: alert[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAllEmergencies(): void {
    this.emergency.getAllEmergencies().subscribe((data) => {
      this.Emergencies = data;
    });
  }

  deleteEmergency(id: any) {
    this.emergency.deleteEmergency(id).subscribe(
      (data: any) => {
        this.Emergencies = data;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllEmergencies();
      },
      (error: any) => {
        console.log(error);
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
      pdf.save('Emergency_report.pdf'); // Generated PDF
    });
  }
}
