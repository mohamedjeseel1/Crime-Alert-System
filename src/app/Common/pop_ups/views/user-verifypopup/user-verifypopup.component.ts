import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { RejectRemarksPopupComponent } from '../complaint-view-popup/reject-remarks-popup/reject-remarks-popup.component';
// import { RejectRemarksPopupComponent } from './reject-remarks-popup/reject-remarks-popup.component';

@Component({
  selector: 'app-user-verifypopup',
  templateUrl: './user-verifypopup.component.html',
  styleUrls: ['./user-verifypopup.component.scss'],
})
export class UserVerifypopupComponent implements OnInit {
  user: any = {
    id: '',
    username: '',
    role: '',
    password: '',
    cpassword: '',
    fullname: '',
    gender: '',
    image: '',
    nic: '',
    address: '',
    contact: '',
    email: '',
    status: '',
    createdAt: '',
    updatedAt: '',
  };

  constructor(
    private remark_popup: MatDialog,
    private usrservice: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = data.user;
    this.user.image = 'http://localhost:8081/' + this.user.image;
  }

  ngOnInit(): void {
    //  this.getAllUsers();
    // this.data.patchValue({
    //   id: this.data.usr.id,
    //   username: this.data.usr.username,
    //   role: this.data.usr.role,
    //   password: this.data.usr.password,
    //   fullname: this.data.usr.fullname,
    //   gender: this.data.usr.gender,
    //   image: this.data.usr.image,
    //   nic: this.data.usr.nic,
    //   address: this.data.usr.address,
    //   contact: this.data.usr.contact,
    //   email: this.data.usr.email,
    //   status: this.data.usr.status,
    //   // createdAt: ,
    //   // updatedAt: ""
    // });
  }

  openRemark() {
    this.remark_popup.open(RejectRemarksPopupComponent, {
      height: 'auto',
      width: '30%',
    });

    this.updateStatus('Rejected');
  }

  // getAllUsers() {
  //   this.usrservice.getAllUsers().subscribe((data: any) => {
  //     console.log(data);
  //     this.users = data;
  //   });
  // }

  updateStatus(status: any) {
    this.usrservice
      .updateStatus({ status: status }, this.user.id)
      .subscribe((data: any) => {
        this.user = data;
        location.reload();
      });
  }
}
