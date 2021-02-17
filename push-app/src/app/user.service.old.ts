import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from './user.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/users'; //or https://randomuser.me/api/

@Injectable()
export class UserService {
  private userSubject = new BehaviorSubject<User>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadUser(id: string) {
    this.getUser(id).subscribe((user) => {
      this.userSubject.next(user);
    });
  }

  private getUser(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
}
