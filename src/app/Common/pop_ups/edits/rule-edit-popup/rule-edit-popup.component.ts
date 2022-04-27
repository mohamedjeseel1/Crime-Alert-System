import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RulesService } from 'src/app/services/rules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rule-edit-popup',
  templateUrl: './rule-edit-popup.component.html',
  styleUrls: ['./rule-edit-popup.component.scss'],
})
export class RuleEditPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RulesService
  ) {}

  ngOnInit(): void {
    // console.log("rule data passsed: ");
    this.newrule.patchValue({
      date: this.data.rule.date,
      category: this.data.rule.category,
      title: this.data.rule.title,
      description: this.data.rule.description,
      // RuleDoc:this.data.rule.documentUrl,
      action: this.data.rule.action,
    });
  }

  newrule = new FormGroup({
    crime_id: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
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

  updateRule() {
    this.service.updateRule(this.newrule.value, this.data.rule.id).subscribe(
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
