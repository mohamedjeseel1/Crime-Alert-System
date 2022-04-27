import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmergencyService } from 'src/app/services/emergency.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emergency-edit-popup',
  templateUrl: './emergency-edit-popup.component.html',
  styleUrls: ['./emergency-edit-popup.component.scss'],
})
export class EmergencyEditPopupComponent implements OnInit {
  constructor(
    private service: EmergencyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.emergencyAlert.patchValue({
      adminid: this.data.alert.adminid,
      category: this.data.alert.category,
      date: this.data.alert.date,
      title: this.data.alert.title,
      description: this.data.alert.description,
      location: this.data.alert.location,
    });
  }

  emergencyAlert = new FormGroup({
    adminid: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
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
  });

  updateAlert() {
    this.service
      .updateEmergency(this.emergencyAlert.value, this.data.alert.id)
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
