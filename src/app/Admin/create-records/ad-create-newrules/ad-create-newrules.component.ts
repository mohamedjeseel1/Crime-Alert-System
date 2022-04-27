import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RulesService } from 'src/app/services/rules.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ad-create-newrules',
  templateUrl: './ad-create-newrules.component.html',
  styleUrls: ['./ad-create-newrules.component.scss'],
})
export class AdCreateNewrulesComponent implements OnInit {
  date: any;
  category: any;
  title: any;
  RuleDoc: any;
  description: any;
  action: any;

  doc_file_name = '';
  doc_file: File;

  // current user
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };
  constructor(
    private service: RulesService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.formNewrule.patchValue({
      adminid: this.user.userId,
    });
  }

  formNewrule = new FormGroup({
    date: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
    RuleDoc: new FormControl(''),
    action: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.doc_file_name = file.name;
      this.doc_file = file;
    }
  }

  // API ( backend functions)

  //Create form data
  createRule(): void {
    const formData = new FormData();

    formData.append('date', this.formNewrule.value.adminid);
    formData.append('date', this.formNewrule.value.date);
    formData.append('category', this.formNewrule.value.category);
    formData.append('title', this.formNewrule.value.title);
    formData.append('description', this.formNewrule.value.description);
    formData.append('RuleDoc', this.formNewrule.value.RuleDoc);
    formData.append('action', this.formNewrule.value.action);
    formData.append('document', this.doc_file);

    this.service.createRule(formData).subscribe(
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
