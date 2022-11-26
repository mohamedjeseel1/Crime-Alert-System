import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})
export class MyprofileComponent implements OnInit {
  filePath: string;

  // current user details
  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
    createdAt: '',
  };

  userProfile = {
    id: '',
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

  constructor(
    private userStorageService: UserStorageService,
    private usrservice: UserService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());

    // this.getUser();
    this.getUserById();
  }

  getUserById() {
    console.log('user profile=======================');
    console.log(this.userProfile);
    console.log('user storage=======================');
    console.log(this.user);
    this.usrservice.getUserById(this.user.userId).subscribe((data: any) => {
      // console.log('==============this: user');
      // console.log(this.user); // this.users.userId
      console.log(data);
      this.userProfile = data;
      this.filePath = 'http://localhost:8081/' + this.userProfile.image;
    });
  }
}
