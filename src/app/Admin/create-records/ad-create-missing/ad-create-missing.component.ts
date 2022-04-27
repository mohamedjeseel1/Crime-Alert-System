import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MissedService } from 'src/app/services/missed.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-create-missing',
  templateUrl: './ad-create-missing.component.html',
  styleUrls: ['./ad-create-missing.component.scss'],
})
export class AdCreateMissingComponent implements OnInit {
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };
  constructor(
    private service: MissedService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.missingForm.patchValue({
      adminid: this.user.userId,
    });
  }

  missingForm = new FormGroup({
    adminid: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    identification: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
    date: new FormControl('', [Validators.required]),
    location: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  // API ( backend functions)
  //Create form data
  createMissed(): void {
    this.service.createMissed(this.missingForm.value).subscribe(
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
