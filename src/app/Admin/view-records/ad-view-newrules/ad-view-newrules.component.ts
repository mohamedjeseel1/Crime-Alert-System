import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RuleViewPopupComponent } from 'src/app/Common/pop_ups/views/rule-view-popup/rule-view-popup.component';
import { RuleEditPopupComponent } from 'src/app/Common/pop_ups/edits/rule-edit-popup/rule-edit-popup.component';
import { RulesService } from 'src/app/services/rules.service';
import { UserStorageService } from 'src/app/services/user-storage.service';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas'; // pdf report
import jspdf from 'jspdf'; // pdf report

import moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ad-view-newrules',
  templateUrl: './ad-view-newrules.component.html',
  styleUrls: ['./ad-view-newrules.component.scss'],
})
export class AdViewNewrulesComponent implements OnInit {
  logged_user_role = '';
  apiBaseUrl = 'localhost:8081/';

  // filter
  searchText: string;
  filtered_option: any;
  // filter(date_between)
  from_date: any;
  to_date: any;

  filterGroup = new FormGroup({
    searchtText: new FormControl(''),
    criteria: new FormControl(''),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
  });

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

  rules_list: any = [
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

  filter_options = [
    {
      name: 'ID',
      key: 'id',
    },

    {
      name: 'Title',
      key: 'title',
    },

    {
      name: 'Date',
      key: 'date',
    },
    {
      name: 'Category',
      key: 'category',
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
      this.rules_list = data;
      console.log('========= rules_list');
      console.log(this.rules_list);
    });
  }

  deleteRule(id: any) {
    console.log('id', id);
    this.rule.deleteRule(id).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getAllRules();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public GenerateReport() {
    let myCanvas = <HTMLCanvasElement>document.getElementById('print_mark');
    html2canvas(myCanvas).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Rules_report.pdf'); // Generated PDF
    });
  }

  // filter between
  dateSelected() {
    this.filterByBetweenDate();
  }

  filterByBetweenDate() {
    if (this.from_date != '' && this.to_date != '') {
      let filteredRules = this.rules.filter((r: any) => {
        return moment(r.date).isBetween(this.from_date, this.to_date);
      });
      this.rules_list = filteredRules;
    } else {
      this.rules_list = this.rules;
    }
  }

  clearDateBetweenFilter() {
    this.rules_list = this.rules;
    this.filterGroup.reset();
  }
}
