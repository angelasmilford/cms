import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'; 
import { NgForm } from '@angular/forms';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.html',
  styles: ``,
})
export class UserEdit {
  originalUser: User | null = null;
  user: User | null = null;

  editMode = false;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {

      const id = params['id'];

      if (id == null) {
        this.editMode = false;
        return;
      }

      this.originalUser = this.userService.getUser(id);

      if (this.originalUser == null) {
        return;
      }

      this.editMode = true;

      this.user = JSON.parse(JSON.stringify(this.originalUser));

    });
  }

  onSubmit(form: NgForm) {

    const value = form.value;

    const newUser = new User(
      '',
      value.username,
      value.email,
      value.password,
      value.role
    );

    if (this.editMode && this.originalUser) {

      this.userService.updateUser(
        this.originalUser,
        newUser
      );

    } else {

      this.userService.addUser(newUser);

    }

    this.router.navigate(['/users']);

  }
}
