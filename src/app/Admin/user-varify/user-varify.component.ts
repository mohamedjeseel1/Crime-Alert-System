import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { UserVerifypopupComponent } from 'src/app/Common/pop_ups/views/user-verifypopup/user-verifypopup.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-varify',
  templateUrl: './user-varify.component.html',
  styleUrls: ['./user-varify.component.scss'],
})
export class UserVarifyComponent implements OnInit {
  apiBaseUrl = 'localhost:8081/';

  filtered_option: any;
  searchText: string;

  filter_options = [
    {
      name: 'ID',
      key: 'id',
    },
    {
      name: 'Username',
      key: 'username',
    },
    {
      name: 'Role',
      key: 'role',
    },
    {
      name: 'NIC',
      key: 'nic',
    },
    {
      name: 'Address/Code',
      key: 'address',
    },
    {
      name: 'Gender',
      key: 'gender',
    },
  ];
  users: any = [
    {
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
    },
  ];
  constructor(private service: UserService, private view_popup: MatDialog) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.service.getAllUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }

  viewUser(id: any) {
    const user = this.users.filter((dataObj: any) => dataObj.id == id);
    if (user.length == 0) return;
    this.view_popup.open(UserVerifypopupComponent, {
      data: {
        user: user[0],
      },
      height: 'auto',
      width: '60%',
    });
  }

  deleteUser(id: any) {
    this.service.deleteUser(id).subscribe(
      (data: any) => {
        console.log(data);
        console.log('User deleted');
        this.getAllUser();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getByStatus(status: any) {
    this.service.getUserByStatus(status).subscribe(
      (data: any) => {
        console.log('getByStatus\n' + data);
        this.users = data;
      },
      (error: any) => {
        console.error('ERROR\n' + error);
      }
    );
  }

  // generate with filter
  public GenerateReport() {
    let myCanvas = <HTMLCanvasElement>document.getElementById('print_mark');
    html2canvas(myCanvas).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('UserInfo_report.pdf'); // Generated PDF
    });
  }
}
