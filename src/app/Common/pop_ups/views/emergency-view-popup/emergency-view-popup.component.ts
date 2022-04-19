import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmergencyService } from 'src/app/services/emergency.service';

@Component({
  selector: 'app-emergency-view-popup',
  templateUrl: './emergency-view-popup.component.html',
  styleUrls: ['./emergency-view-popup.component.scss'],
})
export class EmergencyViewPopupComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: EmergencyService
  ) {
    this.Emergencies = data.Ealert;
  }

  ngOnInit(): void {}
}
