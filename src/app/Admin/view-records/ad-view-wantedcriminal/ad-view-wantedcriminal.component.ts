import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WantedCriminalEditPopupComponent } from 'src/app/Common/pop_ups/edits/wanted-criminal-edit-popup/wanted-criminal-edit-popup.component';
import { WantedCriminalViewPopupComponent } from 'src/app/Common/pop_ups/views/wanted-criminal-view-popup/wanted-criminal-view-popup.component';
import { CriminalService } from 'src/app/services/criminal.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-ad-view-wantedcriminal',
  templateUrl: './ad-view-wantedcriminal.component.html',
  styleUrls: ['./ad-view-wantedcriminal.component.scss'],
})
export class AdViewWantedcriminalComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

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
    private view_popup: MatDialog,
    private criminal: CriminalService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.logged_user_role = JSON.parse(this.userStorageService.getUser()).role;
    this.getAllCriminals();
  }
  // pop-up
  openDialog(id: any) {
    const criminal = this.criminals.filter((dataObj: any) => dataObj.id == id);
    if (criminal.length == 0) return;
    this.view_popup.open(WantedCriminalViewPopupComponent, {
      data: {
        criminal: criminal[0],
      },
      height: 'auto',
      width: '100%',
    });
  }

  edit(id: any) {
    const criminal = this.criminals.filter((dataObj: any) => dataObj.id == id);
    if (criminal.length == 0) return;
    this.view_popup.open(WantedCriminalEditPopupComponent, {
      data: {
        criminal: criminal[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAllCriminals() {
    this.criminal.getAllCriminals().subscribe((data) => {
      this.criminals = data;
    });
  }

  deleteCriminal(id: any) {
    this.criminal.deleteCriminal(id).subscribe(
      (data: any) => {
        this.getAllCriminals();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
