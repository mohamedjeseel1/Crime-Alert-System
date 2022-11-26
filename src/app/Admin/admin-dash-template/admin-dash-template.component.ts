import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyprofileComponent } from 'src/app/Common/pop_ups/myprofile/myprofile.component';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ROLES } from 'src/app/user-auth/roles-enum'; // current user role

@Component({
  selector: 'app-admin-dash-template',
  templateUrl: './admin-dash-template.component.html',
  styleUrls: ['./admin-dash-template.component.scss'],
})
export class AdminDashTemplateComponent implements OnInit {
  roles = ROLES; // current user role

  filePath: string;

  // current user details
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  userProfile = {
    id: 5,
    username: '',
    role: '',
    password: '',
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

  //To identifycurrent user role: purpose - customize slidebar links
  isAdmin = false;
  isPolice = false;
  isPublic = false;

  constructor(
    private userStorageService: UserStorageService,
    private view_popup: MatDialog,
    private usrservice: UserService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    this.isAdmin = this.user.role == this.roles.ADMIN;
    this.isPolice = this.user.role == this.roles.POLICE;
    this.isPublic = this.user.role == this.roles.PUBLIC;

    // this.getUser();
    this.getUserById();
  }
  // My Profile
  myprofile() {
    this.view_popup.open(MyprofileComponent, {
      width: '60%',
      height: 'auto',
    });
  }

  // sign out
  singOut(): void {
    this.userStorageService.signOut();
  }

  getUserById() {
    this.usrservice.getUserById(this.user.userId).subscribe((data: any) => {
      // console.log('==============this: user');
      // console.log(this.user); // this.users.userId
      console.log(data);
      this.userProfile = data;
      this.filePath = 'http://localhost:8081/' + this.userProfile.image;
    });
  }
}
