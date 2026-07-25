import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSelectedEvent = new EventEmitter<User>();
  userChangedEvent = new EventEmitter<User[]>();
  userListChangedEvent = new Subject<User[]>();

  maxUserId: number;

  users: User[] = [];

  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): void {
    this.http.get<User[]>(this.usersUrl)
      .subscribe(
        (users: User[]) => {
          this.users = users;
          this.maxUserId = this.getMaxId();
          this.sortAndSend();
        },
        error => {
          console.error(error);
        }
      );
  }

  getUser(id: string) {
    for (let user of this.users) {
      if (user._id === id || user.id === id) {
        return user;
      }
    }

    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    
    for (let user of this.users) {
      let currentId = parseInt(user.id);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  deleteUser(user: User) {
    if (!user) {
      return;
    }

    const pos = this.users.findIndex(u => u.id === user.id);

    if (pos < 0) {
      return;
    }

    this.http.delete(this.usersUrl + '/' + user.id)
    .subscribe(() => {
        this.users.splice(pos, 1);

        this.sortAndSend();
    });
  }

  addUser(newUser: User) {
    if (!newUser) {
      return;
    }

    newUser.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, user: User }>(
      this.usersUrl,
      newUser,
      { headers: headers }
    )
    .subscribe(
      (responseData) => {
        this.users.push(responseData.user);
        this.sortAndSend();
      }
    );
  }

  updateUser(originalUser: User, newUser: User) {
    if (!originalUser || !newUser) {
      return;
    }

    const pos = this.users.findIndex(u => u.id === originalUser.id);

    if (pos < 0) {
      return;
    }

    newUser.id = originalUser.id;
    newUser._id = originalUser._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      this.usersUrl + '/' + originalUser.id,
      newUser,
      { headers: headers }
    )
    .subscribe(
      () => {
        this.users[pos] = newUser;
        this.sortAndSend();
      }
    );
  }

  login(email: string, password: string) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.post<{
        message: string,
        user: User
      }>(
        this.usersUrl + '/login',
        { email, password },
        { headers: headers }
      );
  }

  register(newUser: User) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<{ message: string, user: User }>(
      this.usersUrl,
      newUser,
      { headers: headers }
    );

  }

  logout() {
    localStorage.removeItem('currentUser');

    this.users = [];
  }

  sortAndSend() {
    this.users.sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }

      if (a.username > b.username) {
        return 1;
      }

      return 0;
    });

    this.userChangedEvent.next(this.users.slice());
  }
}