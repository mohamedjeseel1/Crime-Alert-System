import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmergencyService } from 'src/app/services/emergency.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-create-emergency',
  templateUrl: './ad-create-emergency.component.html',
  styleUrls: ['./ad-create-emergency.component.scss'],
})
export class AdCreateEmergencyComponent implements OnInit {
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };
  constructor(
    private service: EmergencyService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.emergencyAlert.patchValue({
      adminid: this.user.userId,
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

  // API ( backend functions)
  //Create form data
  createEmergency() {
    this.service.createEmergency(this.emergencyAlert.value).subscribe(
      (data: any) => {
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
