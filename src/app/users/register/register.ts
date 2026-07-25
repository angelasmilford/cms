import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styles: ``,
})
export class Register {
  username = '';
  email = '';
  password = '';
  role = 'user';
  showPassword = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onRegister() {
    const user = new User(
      '',
      this.username,
      this.email,
      this.password,
      this.role
    );

    this.userService.register(user)
      .subscribe({
        next: () => {
          alert('Account created successfully.');

          this.router.navigate(['/login']);
        },

        error: () => {
          alert('Unable to create account.');
        }
      });
  }
}
