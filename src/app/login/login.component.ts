import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  username: string;
  password: string;

  constructor(private router: Router) {
    this.username = '';
    this.password = '';
  }

  login(): void {
    if (this.username === 'user' && this.password === 'user') {
      this.setSession('user')
      this.router.navigate(['user']);

      return;
    }

    if (this.username === 'admin' && this.password === 'admin') {
      this.setSession('admin');
      this.router.navigate(['admin']);
      return;
    }

    alert('Invalid username and/or password');
  }

  private setSession(userRole: string): void {
    const fakeToken = {
      loggedIn: userRole
    };

    sessionStorage.setItem('auth', JSON.stringify(fakeToken));
  }

}
