import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  gridColumns: number = 4;
  classname: string = 'col-md-3';

  contact_form: any = [
    {
      userId: '',
      email: '',
      subject: '',
      message: '',
    },
  ];

  constructor(private ContactService: ContactService) {}

  ngOnInit(): void {
    this.getAllMessages();
  }

  // toggle for columns
  toggleGridColumns(cols: number, classname: string) {
    this.gridColumns = cols;
    this.classname = classname;
  }

  msgSubject(original: string): void {}

  getAllMessages() {
    this.ContactService.getAllMessages().subscribe((data: any) => {
      this.contact_form = data;
      console.log(this.contact_form);
    });
  }
}
