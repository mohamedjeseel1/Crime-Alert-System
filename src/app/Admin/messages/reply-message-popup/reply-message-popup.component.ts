import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reply-message-popup',
  templateUrl: './reply-message-popup.component.html',
  styleUrls: ['./reply-message-popup.component.scss'],
})
export class ReplyMessagePopupComponent implements OnInit {
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };
  constructor(
    private userStorageService: UserStorageService,
    private ContactService: ContactService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    // patch the current adminid
    this.reply_message.patchValue({
      adminid: this.user.userId,
      userid: this.data.msg.userId,
      id: this.data.msg.id,
      email: this.data.msg.email,
      subject: this.data.msg.subject,
      message: this.data.msg.message,
    });
  }

  reply_message = new FormGroup({
    id: new FormControl(''),
    userid: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
    adminid: new FormControl(''),
    Re_message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  reply() {
    this.ContactService.replyMessage(
      this.reply_message.value,
      this.data.msg.id
    ).subscribe(
      (data) => {
        Swal.fire({
          background: '',
          color: '',
          width: '300px',
          heightAuto: true,
          position: 'center',
          icon: 'success',
          title: 'Replied Successfully',
          showConfirmButton: true,
          timer: 1500,
        });
        console.log(data);
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
