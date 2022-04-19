// import { AuthService, SignInData } from '../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ROLES } from '../roles-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  roles = ROLES; // enum

  isPasswordVisible: boolean;
  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UserService,
    private userStorageService: UserStorageService
  ) {
    this.isPasswordVisible = true;
  }

  ngOnInit(): void {}
  loginform = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  login(): void {
    // clear the error messages
    this.errorMessage = undefined;

    const val = this.loginform.value;

    // sent user input sign-in data to auth service
    if (val.username && val.password) {
      this.service.login(val.username, val.password).subscribe(
        (data) => {
          this.userStorageService.saveUser(data);
          this.gotoDashboard(data.role);
        },
        (error) => {
          // if error occurs, then set error to errorMessage variable
          this.errorMessage = 'Invalid Credentials';
        }
      );
    }
  }

  // open dashboard by role
  gotoDashboard(role: string): void {
    switch (role) {
      case this.roles.ADMIN:
        this.router.navigate(['/admin/dashboard']);
        break;
      case this.roles.POLICE:
        this.router.navigate(['/police/dashboard']);
        break;
      case this.roles.PUBLIC:
        this.router.navigate(['/public/dashboard']);
        break;
    }
  }
}
