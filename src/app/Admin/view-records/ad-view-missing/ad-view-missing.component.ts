import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MissedEditPopupComponent } from 'src/app/Common/pop_ups/edits/missed-edit-popup/missed-edit-popup.component';
import { MissedViewPopupComponent } from 'src/app/Common/pop_ups/views/missed-view-popup/missed-view-popup.component';
import { MissedService } from 'src/app/services/missed.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-ad-view-missing',
  templateUrl: './ad-view-missing.component.html',
  styleUrls: ['./ad-view-missing.component.scss'],
})
export class AdViewMissingComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

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
    private view_popup: MatDialog,
    private missed: MissedService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.logged_user_role = JSON.parse(this.userStorageService.getUser()).role;
    this.getAllMisseds();
  }

  // Pop-Up
  view(id: any) {
    const missed = this.misseds.filter((dataObj: any) => dataObj.id == id);
    if (missed.length == 0) return;
    this.view_popup.open(MissedViewPopupComponent, {
      data: {
        missed: missed[0],
      },
      height: 'auto',
      width: '100%',
    });
  }

  edit(id: any) {
    const misssed = this.misseds.filter((dataObj: any) => dataObj.id == id);
    if (misssed.length == 0) return;

    this.view_popup.open(MissedEditPopupComponent, {
      data: {
        missed: misssed[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAllMisseds(): void {
    this.missed.getAllMisseds().subscribe((data) => {
      this.misseds = data;
    });
  }

  deleteMissed(id: any) {
    this.missed.deleteMissed(id).subscribe(
      (data) => {
        console.log(data);
        console.log('missed deleted');
        this.getAllMisseds();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
