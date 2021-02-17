import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './user.model';

const baseUrl = 'http://localhost:3000';

@Injectable()
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUser() {
    this.getUser().subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  private getUser(): Observable<User> {
    return this.http.get<User>(`${baseUrl}/user`);
  }
}
