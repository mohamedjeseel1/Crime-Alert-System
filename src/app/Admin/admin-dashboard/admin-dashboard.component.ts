import { Component, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  gridColumns = 3;

  constructor(private ruleService: RulesService) {}

  ngOnInit(): void {
    this.getAllRules();
  }
  // toggle for columns
  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
  getAllRules() {
    this.ruleService.getAllRules().subscribe((data) => {});
  }
}
