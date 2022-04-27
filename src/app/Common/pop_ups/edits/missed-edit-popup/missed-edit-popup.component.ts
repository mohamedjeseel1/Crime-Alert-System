import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MissedService } from 'src/app/services/missed.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-missed-edit-popup',
  templateUrl: './missed-edit-popup.component.html',
  styleUrls: ['./missed-edit-popup.component.scss'],
})
export class MissedEditPopupComponent implements OnInit {
  constructor(
    private service: MissedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.missedDetails.patchValue({
      adminid: this.data.missed.adminid,
      category: this.data.missed.category,
      identification: this.data.missed.identification,
      date: this.data.missed.date,
      location: this.data.missed.location,
      description: this.data.missed.description,
    });
  }

  missedDetails = new FormGroup({
    adminid: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    identification: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    date: new FormControl('', [Validators.required]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  updateMissed() {
    console.log('clicked');
    this.service
      .updateMissed(this.missedDetails.value, this.data.missed.id)
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
