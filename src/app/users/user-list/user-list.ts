import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.html',
  styles: ``,
})
export class UserList implements OnDestroy {
  users: User[] = [];
  
  private subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUsers();

    this.subscription = this.userService.userChangedEvent
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editUser(user: User) {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user);
  }
}
