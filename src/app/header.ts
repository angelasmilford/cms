import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './users/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    standalone: false
})
export class Header {
    isLoggedIn = false;

    constructor(private userService: UserService,
                private router: Router
    ) { }

    ngOnInit() {
        this.isLoggedIn = localStorage.getItem('currentUser') !== null;
    }

    onLogOut() {
        this.userService.logout();

        this.isLoggedIn = false;

        this.router.navigate(['/login']);
    }
}