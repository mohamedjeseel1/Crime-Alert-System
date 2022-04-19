import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrimeService } from 'src/app/services/crime.service';

@Component({
  selector: 'app-crime-view-popup',
  templateUrl: './crime-view-popup.component.html',
  styleUrls: ['./crime-view-popup.component.scss'],
})
export class CrimeViewPopupComponent implements OnInit {
  crimes: any = [
    {
      id: '',
      adminid: '',
      category: '',
      title: '',
      description: '',
      lawOfCrime: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CrimeService
  ) {
    this.crimes = data.crime;
  }

  ngOnInit(): void {}
}
