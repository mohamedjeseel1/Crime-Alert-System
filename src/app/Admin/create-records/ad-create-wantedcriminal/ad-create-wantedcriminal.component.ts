import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CriminalService } from 'src/app/services/criminal.service';
import { UserStorageService } from 'src/app/services/user-storage.service'; // for user Id auto

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
  constructor(
    private service: CriminalService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {}

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
        alert('successfully added!');
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
