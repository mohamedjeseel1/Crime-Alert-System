import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RuleViewPopupComponent } from 'src/app/Common/pop_ups/views/rule-view-popup/rule-view-popup.component';
import { RuleEditPopupComponent } from 'src/app/Common/pop_ups/edits/rule-edit-popup/rule-edit-popup.component';
import { RulesService } from 'src/app/services/rules.service';
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-ad-view-newrules',
  templateUrl: './ad-view-newrules.component.html',
  styleUrls: ['./ad-view-newrules.component.scss'],
})
export class AdViewNewrulesComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

  rules: any = [
    {
      // DB column name
      id: '',
      date: '',
      category: '',
      title: '',
      description: '',
      documentUrl: '',
      action: '',
      createdAt: '',
      updatedAt: '',
    },
  ];

  // API
  constructor(
    private rule: RulesService,
    private view_popup: MatDialog,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    this.logged_user_role = JSON.parse(this.userStorageService.getUser()).role;
    this.getAllRules();
  }

  // Pop-Up open
  view(id: any) {
    const rule = this.rules.filter((dataObj: any) => dataObj.id == id);
    if (rule.length == 0) return;

    this.view_popup.open(RuleViewPopupComponent, {
      data: {
        rule: rule[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  edit(id: any) {
    //filter rule object to be update
    const rule = this.rules.filter((dataObj: any) => dataObj.id == id);
    if (rule.length == 0) return;
    //open edit dialog and pass rule object
    this.view_popup.open(RuleEditPopupComponent, {
      data: {
        rule: rule[0],
      },
      height: 'auto',
      width: '50%',
    });
  }

  getAllRules(): void {
    this.rule.getAllRules().subscribe((data) => {
      this.rules = data;
    });
  }

  deleteRule(id: any) {
    console.log('id', id);
    this.rule.deleteRule(id).subscribe(
      (data: any) => {
        console.log(data);
        alert('rule deleted');
        this.getAllRules();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
