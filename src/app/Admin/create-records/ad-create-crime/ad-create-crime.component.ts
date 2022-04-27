import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrimeService } from 'src/app/services/crime.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-create-crime',
  templateUrl: './ad-create-crime.component.html',
  styleUrls: ['./ad-create-crime.component.scss'],
})
export class AdCreateCrimeComponent implements OnInit {
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };
  constructor(
    private service: CrimeService,
    private userStorageService: UserStorageService
  ) {}

  addcrime = new FormGroup({
    adminid: new FormControl(''),
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    lawOfCrime: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.addcrime.patchValue({
      adminid: this.user.userId,
    });
  }

  createCrime() {
    this.service.createCrime(this.addcrime.value).subscribe(
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
