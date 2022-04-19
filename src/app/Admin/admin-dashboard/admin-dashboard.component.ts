import { Component, OnInit } from '@angular/core';
import { RulesService } from 'src/app/services/rules.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(private ruleService: RulesService) {}

  ngOnInit(): void {
    this.getAllRules();
  }
  getAllRules() {
    this.ruleService.getAllRules().subscribe((data) => {});
  }
}
