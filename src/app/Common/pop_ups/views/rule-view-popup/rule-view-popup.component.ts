import { Component, Inject, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

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
  // generate pdf
  // myCanvas: HTMLCanvasElement;
  public generatePDF() {
    let myCanvas = <HTMLCanvasElement>(
      document.getElementById('contentToConvert')
    );
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
      let filename = 'Rule id-' + this.rules.id + '.pdf';
      pdf.save(filename); // Generated PDF
    });
  }
}
