import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CAreaEditPopupComponent } from 'src/app/Common/pop_ups/edits/c-area-edit-popup/c-area-edit-popup.component';
import { CAreaViewPopupComponent } from 'src/app/Common/pop_ups/views/c-area-view-popup/c-area-view-popup.component';
import { CrimeAreaService } from 'src/app/services/crime-area.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-ad-view-crimearea',
  templateUrl: './ad-view-crimearea.component.html',
  styleUrls: ['./ad-view-crimearea.component.scss'],
})
export class AdViewCrimeareaComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

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
    private view_popup: MatDialog,
    private area: CrimeAreaService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.logged_user_role = JSON.parse(this.userStorageService.getUser()).role;
    this.getAllAreas();
  }

  // Pop-Up
  openDialog(id: any) {
    const area = this.areas.filter((dataObj: any) => dataObj.id == id);
    if (area.length == 0) return;
    this.view_popup.open(CAreaViewPopupComponent, {
      data: {
        area: area[0],
      },
      height: 'auto',
      width: '70%',
    });
  }

  // edit the arae - call popup & pass id
  edit(id: any) {
    const area = this.areas.filter((dataObj: any) => dataObj.id == id);
    // if not found id return 0
    if (area.length == 0) return;

    // show the popup and pass id to popup
    this.view_popup.open(CAreaEditPopupComponent, {
      data: {
        area: area[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAllAreas(): void {
    this.area.getAllAreas().subscribe((data) => {
      this.areas = data;
    });
  }

  deleteArea(id: any) {
    this.area.deleteArea(id).subscribe(
      (data: any) => {
        this.areas = data;
        this.getAllAreas();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
