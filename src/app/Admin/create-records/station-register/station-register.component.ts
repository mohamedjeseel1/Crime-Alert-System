import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StationService } from 'src/app/services/station.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';
// import stationsData from 'src/assets/station_data.json';

@Component({
  selector: 'app-station-register',
  templateUrl: './station-register.component.html',
  styleUrls: ['./station-register.component.scss'],
})
export class StationRegisterComponent implements OnInit {
  hide = true;
  stations: any = []; // Stations json
  // stations: any = stationsData; // Stations json

  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  // branches =[
  //   {
  //     id:1,
  //     district:'colombo',
  //     name:'Maradana',
  //     code:'b1000'
  //   },
  //   {
  //     id:2,
  //     district:'colombo',
  //     name:'Borella',
  //     code:'b1001'
  //   },
  //   {
  //     id:3,
  //     district:'colombo',
  //     name:'Kaduwela',
  //     code:'b1002'
  //   },
  //   {
  //     id:1,
  //     district:'colombo',
  //     name:'Maradana',
  //     code:'b1000'
  //   },
  //   {
  //     id:1,
  //     district:'colombo',
  //     name:'Maradana',
  //     code:'b1000'
  //   },
  //   {
  //     id:1,
  //     district:'colombo',
  //     name:'Maradana',
  //     code:'b1000'
  //   },
  // ];

  constructor(
    private stationService: StationService,
    private userStorageService: UserStorageService,
    private httpClient: HttpClient
  ) {}

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

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.station.patchValue({
      adminid: this.user.userId,
    });
    // Stations json
    // this.httpClient.get('assets/station_data.json').subscribe((data) => {
    //   console.log(data);
    //   this.stations = data;
    // });
  }

  create() {
    this.stationService.createStation(this.station.value).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Created Successfully',
          showConfirmButton: true,
          timer: 1500,
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
