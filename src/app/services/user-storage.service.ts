import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor(private router: Router) {}

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    //return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    return sessionStorage.getItem(USER_KEY) || {};
  }

  signOut(): void {
    window.sessionStorage.clear();
    //Redirect to login page
    this.router.navigate(['']);
  }
}
