import { Component, Inject, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rule-view-popup',
  templateUrl: './rule-view-popup.component.html',
  styleUrls: ['./rule-view-popup.component.scss'],
})
export class RuleViewPopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RulesService
  ) {
    this.rules = data.rule;
  }

  ngOnInit(): void {
    this.viewOneRule();
    this.data.patchValue({
      date: this.data.rule.date,
      category: this.data.rule.category,
      title: this.data.rule.title,
      description: this.data.rule.description,
      documentUrl: this.data.rule.documentUrl,
      action: this.data.rule.action,
      // createdAt: ,
      // updatedAt: ""
    });
  }
  rules: any = [
    {
      // DB column name
      id: this.data.id,
      date: this.data.date,
      category: this.data.category,
      title: this.data.title,
      description: this.data.description,
      action: this.data.action,
      createdAt: '',
      updatedAt: '',
    },
  ];

  viewOneRule(): void {
    this.service
      .getOneRule(this.rules.value, this.rules.id)
      .subscribe((ruleData) => {
        this.rules = ruleData;
      });
  }
}
