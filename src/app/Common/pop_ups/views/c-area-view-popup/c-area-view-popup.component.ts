import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrimeAreaService } from 'src/app/services/crime-area.service';

@Component({
  selector: 'app-c-area-view-popup',
  templateUrl: './c-area-view-popup.component.html',
  styleUrls: ['./c-area-view-popup.component.scss'],
})
export class CAreaViewPopupComponent implements OnInit {
  areas: any = [
    {
      // DB column name
      id: '',
      adminid: '',
      category: '',
      date: '',
      title: '',
      description: '',
      location: '',
      start_date_time: '',
      end_date_time: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CrimeAreaService
  ) {
    this.areas = data.area;
  }

  ngOnInit(): void {}
}
