import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { ROLES } from 'src/app/user-auth/roles-enum';

@Component({
  selector: 'app-admin-dash-template',
  templateUrl: './admin-dash-template.component.html',
  styleUrls: ['./admin-dash-template.component.scss'],
})
export class AdminDashTemplateComponent implements OnInit {
  roles = ROLES;

  user = {
    userId: '',
    username: '',
    role: '',
    fullname: '',
  };

  //To identify curent user is admin or not:purpose - customize slidebar links
  isAdmin = false;
  isPolice = false;
  isPublic = false;

  constructor(private userStorageService: UserStorageService) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.userStorageService.getUser());
    this.isAdmin = this.user.role == this.roles.ADMIN;
    this.isPolice = this.user.role == this.roles.POLICE;
    this.isPublic = this.user.role == this.roles.PUBLIC;
  }

  singOut(): void {
    this.userStorageService.signOut();
  }
}
