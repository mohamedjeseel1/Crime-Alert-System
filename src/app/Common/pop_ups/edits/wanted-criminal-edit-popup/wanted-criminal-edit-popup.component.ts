import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CriminalService } from 'src/app/services/criminal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wanted-criminal-edit-popup',
  templateUrl: './wanted-criminal-edit-popup.component.html',
  styleUrls: ['./wanted-criminal-edit-popup.component.scss'],
})
export class WantedCriminalEditPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: CriminalService
  ) {}

  ngOnInit(): void {
    // patch the table data for update
    this.wantedCriminal.patchValue({
      crimeid: this.data.criminal.crimeid,
      adminid: this.data.criminal.adminid,
      category: this.data.criminal.category,
      fullname: this.data.criminal.fullname,
      date: this.data.criminal.date,
      dob: this.data.criminal.dob,
      nic: this.data.criminal.nic,
      gender: this.data.criminal.gender,
      pAddress: this.data.criminal.pAddress,
      cAddress: this.data.criminal.cAddress,
    });
  }

  wantedCriminal = new FormGroup({
    crimeid: new FormControl('', [Validators.required]),
    adminid: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    date: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    nic: new FormControl('', [Validators.required, Validators.minLength(10)]),
    gender: new FormControl('', [Validators.required]),
    Image: new FormControl('', [Validators.required]),
    pAddress: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    cAddress: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  updateCriminal() {
    // the new details with id send to the service
    this.service
      .updateCriminal(this.wantedCriminal.value, this.data.criminal.id)
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
