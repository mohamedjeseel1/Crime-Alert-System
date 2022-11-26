import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { CAreaEditPopupComponent } from 'src/app/Common/pop_ups/edits/c-area-edit-popup/c-area-edit-popup.component';
import { CAreaViewPopupComponent } from 'src/app/Common/pop_ups/views/c-area-view-popup/c-area-view-popup.component';
import { CrimeAreaService } from 'src/app/services/crime-area.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

import moment from 'moment'; // filter between
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ad-view-crimearea',
  templateUrl: './ad-view-crimearea.component.html',
  styleUrls: ['./ad-view-crimearea.component.scss'],
})
export class AdViewCrimeareaComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

  // filter
  searchText: string;
  filtered_option: any;
  // filter(date_between)
  from_date: any;
  to_date: any;

  filterGroup = new FormGroup({
    searchtText: new FormControl(''),
    criteria: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });

  filter_options = [
    {
      name: 'ID',
      key: 'id',
    },

    {
      name: 'Category',
      key: 'category',
    },
    {
      name: 'Date',
      key: 'date',
    },

    {
      name: 'Location',
      key: 'location',
    },
    {
      name: 'AreaCode',
      key: 'areaCode',
    },
  ];
  areas: any = [
    {
      // DB column name
      id: '',
      adminid: '',
      category: '',
      date: '',
      areaCode: '',
      title: '',
      description: '',
      location: '',
      start_date_time: '',
      end_date_time: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  // After between filter
  areas_data: any = [
    {
      // DB column name
      id: '',
      adminid: '',
      category: '',
      date: '',
      areaCode: '',
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
      // filter between
      this.areas_data = data;
      console.log('=========.areas_data');
      console.log(this.areas_data);
    });
  }

  deleteArea(id: any) {
    this.area.deleteArea(id).subscribe(
      (data: any) => {
        this.areas = data;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllAreas();
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
      pdf.save('CrimeArea_report.pdf'); // Generated PDF
    });
  }

  // between filter
  dateSelected() {
    this.filterByBetweenDate();
  }

  filterByBetweenDate() {
    if (this.from_date != '' && this.to_date != '') {
      let filteredAreas = this.areas.filter((r: any) => {
        return moment(r.date).isBetween(this.from_date, this.to_date);
      });
      this.areas_data = filteredAreas;
    } else {
      this.areas_data = this.areas;
    }
  }

  clearDateBetweenFilter() {
    this.areas_data = this.areas;
    this.filterGroup.reset();
  }
}
