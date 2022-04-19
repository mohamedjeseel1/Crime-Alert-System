import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AcceptedPopupComponent } from '../../../accepted-popup/accepted-popup.component';

@Component({
  selector: 'app-reject-remarks-popup',
  templateUrl: './reject-remarks-popup.component.html',
  styleUrls: ['./reject-remarks-popup.component.scss']
})
export class RejectRemarksPopupComponent implements OnInit {

  constructor(private accept: MatDialog) { }

  ngOnInit(): void {
  }

  submit(){
  this.accept.open(AcceptedPopupComponent, { height:'auto', width:'30%'})
  }

}
