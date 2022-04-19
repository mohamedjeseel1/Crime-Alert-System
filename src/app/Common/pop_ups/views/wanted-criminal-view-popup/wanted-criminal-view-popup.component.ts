import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriminalService } from 'src/app/services/criminal.service';

@Component({
  selector: 'app-wanted-criminal-view-popup',
  templateUrl: './wanted-criminal-view-popup.component.html',
  styleUrls: ['./wanted-criminal-view-popup.component.scss'],
})
export class WantedCriminalViewPopupComponent implements OnInit {
  criminals: any = [
    {
      id: '',
      crimeid: '',
      adminid: '',
      category: '',
      fullname: '',
      date: '',
      dob: '',
      nic: '',
      gender: '',
      pAddress: '',
      cAddress: '',
      image: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CriminalService
  ) {
    this.criminals = data.criminal;
  }

  ngOnInit(): void {
    console.log('=============================');

    console.log(this.criminals);
  }
}
