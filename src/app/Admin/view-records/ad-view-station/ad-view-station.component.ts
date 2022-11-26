import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { StationService } from 'src/app/services/station.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

import moment from 'moment'; // filter between
import { StationEditComponent } from 'src/app/Common/pop_ups/edits/station-edit/station-edit.component';
import { StationViewComponent } from 'src/app/Common/pop_ups/views/station-view/station-view.component';

@Component({
  selector: 'app-ad-view-station',
  templateUrl: './ad-view-station.component.html',
  styleUrls: ['./ad-view-station.component.scss'],
})
export class AdViewStationComponent implements OnInit {
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
      name: 'Station Name',
      key: 'sname',
    },

    {
      name: 'Branch Code',
      key: 'branchCode',
    },
    {
      name: 'District',
      key: 'district',
    },
  ];

  station: any = [
    {
      adminid: '',
      province: '',
      district: '',
      branchCode: '',
      Sname: '',
      contact: '',
      email: '',
      date: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  // After between filter
  station_data: any = [
    {
      adminid: '',
      province: '',
      district: '',
      branchCode: '',
      Sname: '',
      contact: '',
      email: '',
      date: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  constructor(
    private view_popup: MatDialog,
    private stationService: StationService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.logged_user_role = JSON.parse(this.userStorageService.getUser()).role;
    this.getAllStation();
  }

  // Pop-Up
  openDialog(id: any) {
    const station = this.station.filter((dataObj: any) => dataObj.id == id);
    if (station.length == 0) return;
    this.view_popup.open(StationViewComponent, {
      data: {
        station: station[0],
      },
      height: 'auto',
      width: '100%',
    });
  }
  // edit the arae - call popup & pass id
  edit(id: any) {
    const station = this.station.filter((dataObj: any) => dataObj.id == id);
    // if not found id return 0
    if (station.length == 0) return;

    // show the popup and pass id to popup
    this.view_popup.open(StationEditComponent, {
      data: {
        station: station[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAllStation() {
    return this.stationService.getAllStations().subscribe((data: any) => {
      this.station = data;

      // filter between
      this.station_data = data;
      console.log('=========.station_data');
      console.log(this.station_data);
    });
  }

  deleteStation(id: any) {
    return this.stationService.deleteStation(id).subscribe((data) => {
      this.station = data;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      this.getAllStation();
    });
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
      pdf.save('Station_report.pdf'); // Generated PDF
    });
  }

  // between filter
  dateSelected() {
    this.filterByBetweenDate();
  }

  filterByBetweenDate() {
    if (this.from_date != '' && this.to_date != '') {
      let filteredStations = this.station.filter((r: any) => {
        return moment(r.date).isBetween(this.from_date, this.to_date);
      });
      this.station_data = filteredStations;
    } else {
      this.station_data = this.station;
    }
  }

  clearDateBetweenFilter() {
    this.station_data = this.station;
    this.filterGroup.reset();
  }
}
