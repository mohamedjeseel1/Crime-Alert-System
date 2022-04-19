import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Common/home/home.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { LoginComponent } from './user-auth/login/login.component';

import { AdminComplaintComponent } from './Admin/admin-complaint/admin-complaint.component';
import { AdminDashTemplateComponent } from './Admin/admin-dash-template/admin-dash-template.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { CreateRecordsComponent } from './Admin/create-records/create-records.component';
import { ReportComponent } from './Admin/report/report.component';
import { UserVarifyComponent } from './Admin/user-varify/user-varify.component';
import { ViewRecordsComponent } from './Admin/view-records/view-records.component';
import { RequestComponent } from './Public/complaint/request/request.component';
import { ViewComponent } from './Public/complaint/view/view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashTemplateComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'create-records', component: CreateRecordsComponent },
      { path: 'view-records', component: ViewRecordsComponent },
      { path: 'complaints', component: AdminComplaintComponent },
      { path: 'reports', component: ReportComponent },
      { path: 'user-verify', component: UserVarifyComponent },
    ],
  },

  // Police
  {
    path: 'police',
    component: AdminDashTemplateComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'view-records', component: ViewRecordsComponent },
      { path: 'reports', component: ReportComponent },
    ],
  },

  // Public
  {
    path: 'public',
    component: AdminDashTemplateComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'view-records', component: ViewRecordsComponent },
      { path: 'view-complaint', component: ViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
