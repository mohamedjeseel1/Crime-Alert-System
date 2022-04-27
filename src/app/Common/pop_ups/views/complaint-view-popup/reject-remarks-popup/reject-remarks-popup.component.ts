import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reject-remarks-popup',
  templateUrl: './reject-remarks-popup.component.html',
  styleUrls: ['./reject-remarks-popup.component.scss'],
})
export class RejectRemarksPopupComponent implements OnInit {
  constructor(private accept: MatDialog) {}

  ngOnInit(): void {}

  submit() {}
}
