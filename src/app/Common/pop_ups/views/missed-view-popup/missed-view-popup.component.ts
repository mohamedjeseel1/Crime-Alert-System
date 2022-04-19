import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MissedService } from 'src/app/services/missed.service';

@Component({
  selector: 'app-missed-view-popup',
  templateUrl: './missed-view-popup.component.html',
  styleUrls: ['./missed-view-popup.component.scss'],
})
export class MissedViewPopupComponent implements OnInit {
  misseds: any = [
    {
      id: '',
      adminid: '',
      category: '',
      identification: '',
      date: '',
      location: '',
      description: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: MissedService
  ) {
    this.misseds = data.missed;
  }

  ngOnInit(): void {}
}
