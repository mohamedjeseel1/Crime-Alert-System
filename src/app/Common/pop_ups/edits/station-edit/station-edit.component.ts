import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StationService } from 'src/app/services/station.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-station-edit',
  templateUrl: './station-edit.component.html',
  styleUrls: ['./station-edit.component.scss'],
})
export class StationEditComponent implements OnInit {
  stations: any = []; // Stations json

  constructor(
    private service: StationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.station.patchValue({
      adminid: this.data.station.adminid,
      province: this.data.station.province,
      district: this.data.station.district,
      town: this.data.station.town,
      branchCode: this.data.station.branchCode,
      Sname: this.data.station.Sname,
      contact: this.data.station.contact,
      email: this.data.station.email,
    });

    // Stations json
    this.httpClient.get('assets/station_data.json').subscribe((data) => {
      console.log(data);
      this.stations = data;
    });
  }

  //station Form
  station: FormGroup = new FormGroup({
    adminid: new FormControl(''),
    province: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    town: new FormControl('', Validators.required),
    branchCode: new FormControl('', Validators.required),
    Sname: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
  });

  updateStation() {
    this.service
      .updateStation(this.station.value, this.data.station.id)
      .subscribe(
        (data) => {
          Swal.fire({
            background: '',
            color: '',
            width: '300px',
            heightAuto: true,
            position: 'center',
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: true,
            timer: 1500,
          });
          console.log(data);
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
