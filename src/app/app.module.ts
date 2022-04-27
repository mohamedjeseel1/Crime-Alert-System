import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Common/home/home.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { LoginComponent } from './user-auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './materials/materials.module';
// Admin
import { CreateRecordsComponent } from './Admin/create-records/create-records.component';
import { ViewRecordsComponent } from './Admin/view-records/view-records.component';
import { UserVarifyComponent } from './Admin/user-varify/user-varify.component';
import { ReportComponent } from './Admin/report/report.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AdminComplaintComponent } from './Admin/admin-complaint/admin-complaint.component';
import { AdminDashTemplateComponent } from './Admin/admin-dash-template/admin-dash-template.component';
import { AdViewNewrulesComponent } from './Admin/view-records/ad-view-newrules/ad-view-newrules.component';
import { AdViewWantedcriminalComponent } from './Admin/view-records/ad-view-wantedcriminal/ad-view-wantedcriminal.component';
import { AdViewMissingComponent } from './Admin/view-records/ad-view-missing/ad-view-missing.component';
import { AdViewCrimeComponent } from './Admin/view-records/ad-view-crime/ad-view-crime.component';
import { AdViewCrimeareaComponent } from './Admin/view-records/ad-view-crimearea/ad-view-crimearea.component';
import { AdViewEmergencyComponent } from './Admin/view-records/ad-view-emergency/ad-view-emergency.component';
import { AdCreateNewrulesComponent } from './Admin/create-records/ad-create-newrules/ad-create-newrules.component';
import { AdCreateWantedcriminalComponent } from './Admin/create-records/ad-create-wantedcriminal/ad-create-wantedcriminal.component';
import { AdCreateMissingComponent } from './Admin/create-records/ad-create-missing/ad-create-missing.component';
import { AdCreateCrimeComponent } from './Admin/create-records/ad-create-crime/ad-create-crime.component';
import { AdCreateCrimeareaComponent } from './Admin/create-records/ad-create-crimearea/ad-create-crimearea.component';
import { AdCreateEmergencyComponent } from './Admin/create-records/ad-create-emergency/ad-create-emergency.component';
import { BackgroundComponent } from './Common/background/background.component';
// http
import { HttpClientModule } from '@angular/common/http';
// pop_up
import { RuleViewPopupComponent } from './Common/pop_ups/views/rule-view-popup/rule-view-popup.component';
import { CrimeViewPopupComponent } from './Common/pop_ups/views/crime-view-popup/crime-view-popup.component';
import { WantedCriminalViewPopupComponent } from './Common/pop_ups/views/wanted-criminal-view-popup/wanted-criminal-view-popup.component';
import { MissedViewPopupComponent } from './Common/pop_ups/views/missed-view-popup/missed-view-popup.component';
import { CAreaViewPopupComponent } from './Common/pop_ups/views/c-area-view-popup/c-area-view-popup.component';
import { EmergencyViewPopupComponent } from './Common/pop_ups/views/emergency-view-popup/emergency-view-popup.component';
import { ComplaintViewPopupComponent } from './Common/pop_ups/views/complaint-view-popup/complaint-view-popup.component';
import { RejectRemarksPopupComponent } from './Common/pop_ups/views/complaint-view-popup/reject-remarks-popup/reject-remarks-popup.component';
import { RuleEditPopupComponent } from './Common/pop_ups/edits/rule-edit-popup/rule-edit-popup.component';
import { WantedCriminalEditPopupComponent } from './Common/pop_ups/edits/wanted-criminal-edit-popup/wanted-criminal-edit-popup.component';
import { MissedEditPopupComponent } from './Common/pop_ups/edits/missed-edit-popup/missed-edit-popup.component';
import { EmergencyEditPopupComponent } from './Common/pop_ups/edits/emergency-edit-popup/emergency-edit-popup.component';
import { CrimeEditPopupComponent } from './Common/pop_ups/edits/crime-edit-popup/crime-edit-popup.component';
import { CAreaEditPopupComponent } from './Common/pop_ups/edits/c-area-edit-popup/c-area-edit-popup.component';
import { ViewComponent } from './Public/complaint/view/view.component';
import { RequestComponent } from './Public/complaint/request/request.component';
import { UserVerifypopupComponent } from './Common/pop_ups/views/user-verifypopup/user-verifypopup.component';

// new
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyprofileComponent } from './Common/pop_ups/myprofile/myprofile.component';

@NgModule({
  declarations: [
    //common
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,

    // Admin
    AdminDashboardComponent,
    CreateRecordsComponent,
    ViewRecordsComponent,
    UserVarifyComponent,
    ReportComponent,
    AdminDashTemplateComponent,
    AdViewNewrulesComponent,
    AdViewWantedcriminalComponent,
    AdViewMissingComponent,
    AdViewCrimeComponent,
    AdViewCrimeareaComponent,
    AdViewEmergencyComponent,
    AdCreateNewrulesComponent,
    AdCreateWantedcriminalComponent,
    AdCreateMissingComponent,
    AdCreateCrimeComponent,
    AdCreateCrimeareaComponent,
    AdCreateEmergencyComponent,
    AdminComplaintComponent,
    BackgroundComponent,
    // pop_up
    RuleViewPopupComponent,
    CrimeViewPopupComponent,
    WantedCriminalViewPopupComponent,
    MissedViewPopupComponent,
    CAreaViewPopupComponent,
    EmergencyViewPopupComponent,
    ComplaintViewPopupComponent,
    RejectRemarksPopupComponent,
    RuleEditPopupComponent,
    WantedCriminalEditPopupComponent,
    MissedEditPopupComponent,
    EmergencyEditPopupComponent,
    CrimeEditPopupComponent,
    CAreaEditPopupComponent,
    ViewComponent,
    RequestComponent,
    UserVerifypopupComponent,
    MyprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialsModule, // importing material component module.
    HttpClientModule, // http

    // new
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
