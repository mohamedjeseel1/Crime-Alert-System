import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrimeService } from 'src/app/services/crime.service';
import { CriminalService } from 'src/app/services/criminal.service';
import { UserStorageService } from 'src/app/services/user-storage.service'; // for user Id auto
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-create-wantedcriminal',
  templateUrl: './ad-create-wantedcriminal.component.html',
  styleUrls: ['./ad-create-wantedcriminal.component.scss'],
})
export class AdCreateWantedcriminalComponent implements OnInit {
  doc_file_name = '';
  doc_file: File;
  filePath: string;

  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  crimes: any = [
    {
      id: '',
      adminid: '',
      category: '',
      title: '',
      description: '',
      lawOfCrime: '',
      createdAt: '',
      updatedAt: '',
    },
  ];
  constructor(
    private service: CriminalService,
    private userStorageService: UserStorageService,
    private crimeservice: CrimeService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.wantedCriminal.patchValue({
      adminid: this.user.userId,
    });
  }
  getAll() {
    this.crimeservice.getAllCrimes().subscribe(
      (data: any) => {
        this.crimes = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  wantedCriminal = new FormGroup({
    crimeid: new FormControl('', [Validators.required]),
    adminid: new FormControl(this.user.userId, [Validators.required]),
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

  createCriminal(): void {
    // If any files have the form, we've creating like this way
    const formData = new FormData();

    formData.append('crimeid', this.wantedCriminal.value.crimeid);
    formData.append('adminid', this.wantedCriminal.value.adminid);
    formData.append('category', this.wantedCriminal.value.category);
    formData.append('fullname', this.wantedCriminal.value.fullname);
    formData.append('date', this.wantedCriminal.value.date);
    formData.append('dob', this.wantedCriminal.value.dob);
    formData.append('nic', this.wantedCriminal.value.nic);
    formData.append('gender', this.wantedCriminal.value.gender);
    formData.append('pAddress', this.wantedCriminal.value.pAddress);
    formData.append('cAddress', this.wantedCriminal.value.cAddress);
    formData.append('document', this.doc_file);

    // if the form don't has file upload, we can create it in this way.
    // this.service.createEmergency(this.emergencyAlert.value).subscribe(
    this.service.createCriminal(formData).subscribe(
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.doc_file_name = file.name;
      this.doc_file = file;

      // Preprare file path to <image> src [src= filePath]
      //show the selected image on html card
      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
