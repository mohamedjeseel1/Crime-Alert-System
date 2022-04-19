import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RejectRemarksPopupComponent } from '../complaint-view-popup/reject-remarks-popup/reject-remarks-popup.component';
// import { RejectRemarksPopupComponent } from './reject-remarks-popup/reject-remarks-popup.component';


@Component({
  selector: 'app-user-verifypopup',
  templateUrl: './user-verifypopup.component.html',
  styleUrls: ['./user-verifypopup.component.scss']
})
export class UserVerifypopupComponent implements OnInit {

  constructor(private remark_popup: MatDialog) { }

  ngOnInit(): void {
  }

  openRemark(){
    this.remark_popup.open(RejectRemarksPopupComponent,
      {
        height: 'auto',
        width: '30%'
      }
      
    )
  }

  changeStatus(status:any){
     // this.service.updateStatus(status, this.data.id).subscribe(

    //  );
  }

}
