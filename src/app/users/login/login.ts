import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  email = '';
  password = '';
  showPassword = false;

  constructor(private userService: UserService,
              private router: Router
  ) { }

  onLogin() {
    this.userService.login(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(response.user)
          );

          this.router.navigate(['/documents']);
        },

        error: () => {
          alert('Invalid email or password.');
        }
      });
  }
}
