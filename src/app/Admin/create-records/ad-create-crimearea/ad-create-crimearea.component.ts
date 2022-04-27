import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrimeAreaService } from 'src/app/services/crime-area.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-create-crimearea',
  templateUrl: './ad-create-crimearea.component.html',
  styleUrls: ['./ad-create-crimearea.component.scss'],
})
export class AdCreateCrimeareaComponent implements OnInit {
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };
  constructor(
    private service: CrimeAreaService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.crimeArea.patchValue({
      adminid: this.user.userId,
    });
  }

  crimeArea = new FormGroup({
    adminid: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    areaCode: new FormControl(''),
    start_date_time: new FormControl('', [Validators.required]),
    end_date_time: new FormControl('', [Validators.required]),
  });

  createArea(): void {
    this.service.createArea(this.crimeArea.value).subscribe(
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
