import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { StationService } from 'src/app/services/station.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  doc_file_name = '';
  doc_file: File;

  //  station data for police branchcode
  station: any = [
    {
      adminid: '',
      province: '',
      district: '',
      branchCode: '',
      Sname: '',
      contact: '',
      email: '',
      date: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private Stationservice: StationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.formdata.values);
    this.getAllStation();
  }

  userdetails = this.fb.group(
    {
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z]*'),
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
      ],
      role: ['', Validators.required],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      cpassword: ['', Validators.required],
    },
    {
      // is same password and cnfrm password - 1
      validators: this.notmatch('password', 'cnfrmpassword'),
    }
  );

  personaldetails = this.fb.group({
    fullname: [
      '',
      Validators.compose([
        Validators.required,
        // Validators.pattern('[a-zA-Z]*'),
        Validators.minLength(10),
      ]),
    ],
    gender: ['', Validators.required],
    image: ['', Validators.required],
    nic: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9a-zA-Z]*'),
        Validators.minLength(10),
        Validators.maxLength(12),
      ]),
    ],
  });

  contactdetails = this.fb.group({
    address: ['', Validators.required],
    contact: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]*'),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
    ],
  });

  // object for register
  formdata: any = {
    // // userdetails
    // username : this.userdetails.value.username,
    // role : this.userdetails.value.role,
    // password : this.userdetails.value.password,
    // cpassword : this.userdetails.value.cpassword,
    // personaldetails
    // fullname:this.personaldetails.value.fullname,
    // gender:this.personaldetails.value.gender,
    // image:this.personaldetails.value.image,
    // nic:this.personaldetails.value.nic,
    // contactdetails
    // address :this.contactdetails.value.address,
    // contact :this.contactdetails.value.contact,
    // email :this.contactdetails.value.email,
  };

  get userform() {
    return this.userdetails.controls;
  }

  /// is same password and cnfrm password -2
  notmatch(password: string, cpassword: string) {
    return (formGroup: FormGroup) => {
      const errors: ValidationErrors = {};
      const passwordControl = formGroup.controls[password];
      const cpasswordControl = formGroup.controls[cpassword];

      if (passwordControl?.value !== cpasswordControl?.value) {
        cpasswordControl?.setErrors({ notmatch: true });
      }
      return errors;
    };
  }

  //  get station data for police branchcode
  getAllStation() {
    return this.Stationservice.getAllStations().subscribe((data: any) => {
      this.station = data;
      // filter between

      console.log('=========.station');
      console.log(this.station);
    });
  }

  register(data: any) {
    const formData = new FormData();

    // userdetails
    formData.append('username', this.userdetails.value.username);
    formData.append('role', this.userdetails.value.role);
    formData.append('password', this.userdetails.value.password);
    // personaldetails
    formData.append('fullname', this.personaldetails.value.fullname);
    formData.append('gender', this.personaldetails.value.gender);
    formData.append('image', this.doc_file);
    formData.append('nic', this.personaldetails.value.nic);
    // contactdetails
    formData.append('address', this.contactdetails.value.address);
    formData.append('contact', this.contactdetails.value.contact);
    formData.append('email', this.contactdetails.value.email);

    // if the form don't has file upload, we can create it in this way.
    // this.service.createEmergency(this.emergencyAlert.value).subscribe(
    this.service.register(formData).subscribe(
      (data: any) => {
        console.log(data);
        // sweet alert
        Swal.fire(
          'Successfully Created!',
          'You clicked the button!',
          'success'
        );
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.doc_file_name = file.name;
      this.doc_file = file;
    }
  }
}
