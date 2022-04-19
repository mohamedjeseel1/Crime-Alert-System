import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmergencyEditPopupComponent } from 'src/app/Common/pop_ups/edits/emergency-edit-popup/emergency-edit-popup.component';
import { EmergencyViewPopupComponent } from 'src/app/Common/pop_ups/views/emergency-view-popup/emergency-view-popup.component';
import { EmergencyService } from 'src/app/services/emergency.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-ad-view-emergency',
  templateUrl: './ad-view-emergency.component.html',
  styleUrls: ['./ad-view-emergency.component.scss'],
})
export class AdViewEmergencyComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

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
        this.getAllEmergencies();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
