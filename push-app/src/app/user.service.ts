import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, filter, shareReplay } from 'rxjs/operators';

import { User } from './user.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/users'; //or https://randomuser.me/api/

@Injectable()
export class UserService {
  private selectedUserId = new BehaviorSubject<string>(null);

  user$ = this.selectedUserId.pipe(
    filter(Boolean),
    switchMap((id: string) => this.getUser(id)),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  loadUser(id: string) {
    this.selectedUserId.next(id);
  }

  private getUser(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }
}
