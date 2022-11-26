import { Component, OnInit } from '@angular/core';
import { withModule } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';
import { StationRegisterComponent } from '../../Admin/create-records/station-register/station-register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private ContactService: ContactService) {}

  ngOnInit(): void {}

  contact_form = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  contactForm() {
    this.ContactService.contactForm(this.contact_form.value).subscribe(
      (data) => {
        console.log(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Submitted Successfully',
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
