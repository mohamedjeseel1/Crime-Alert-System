import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';
import { ReplyMessagePopupComponent } from './reply-message-popup/reply-message-popup.component';
import { ROLES } from 'src/app/user-auth/roles-enum'; // current user role
import { UserStorageService } from 'src/app/services/user-storage.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  roles = ROLES; // current user role

  gridColumns: number = 4;
  classname: string = 'col-md-3';

  // current user role
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  contact_form: any = [
    {
      id: '',
      userId: '',
      email: '',
      subject: '',
      message: '',
      adminid: '',
      Re_message: '',
    },
  ];

  //To identify curent user -  // current user role
  isAdmin = false;
  isPolice = false;
  isPublic = false;

  constructor(
    private ContactService: ContactService,
    private view_popup: MatDialog,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    // current user role
    this.user = JSON.parse(this.userStorageService.getUser());
    this.isAdmin = this.user.role == this.roles.ADMIN;
    this.isPolice = this.user.role == this.roles.POLICE;
    this.isPublic = this.user.role == this.roles.PUBLIC;

    this.getAllMessages();
    this.getRandomColor();
  }

  // toggle for columns
  toggleGridColumns(cols: number, classname: string) {
    this.gridColumns = cols;
    this.classname = classname;
  }

  msgSubject(original: string): void {}

  getAllMessages() {
    this.ContactService.getAllMessages().subscribe((data: any) => {
      if (this.user.role == 'admin') {
        this.contact_form = data;
      } else {
        this.contact_form = data.filter(
          (m: any) => m.userId == this.user.userId
        );
      }
      console.log(this.contact_form);
    });
  }

  deleteMessage(id: any) {
    this.ContactService.deleteMessage(id).subscribe(
      (data) => {
        Swal.fire({
          background: '',
          color: '',
          width: '300px',
          heightAuto: true,
          position: 'center',
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: true,
          timer: 1500,
        });
        console.log(data);
        this.getAllMessages();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // get random colors for card
  // getRandomColor() {
  //   var color = Math.floor(0x1000000 * Math.random()).toString(16);
  //   return '#' + ('000000' + color).slice(-6);
  // }
  getRandomColor() {
    var length = 6;
    var chars = '0123456789ABCDEF';
    var hex = '#';
    while (length--) hex += chars[(Math.random() * 16) | 0];
    return hex;
  }

  openReply(id: any) {
    const msg = this.contact_form.filter((dataObj: any) => dataObj.id == id);
    // if not found id return 0
    console.log(msg);
    if (msg.length == 0) return;
    this.view_popup.open(ReplyMessagePopupComponent, {
      data: {
        msg: msg[0],
      },
      height: 'auto',
      width: 'auto',
    });
  }
}
