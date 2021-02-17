import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  userIds = Array.from({ length: 10 }, (_, i) => i + 1);
  userControl = new FormControl();

  private subSink = new Subscription();

  get user(): User {
    return this.userService.user;
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subSink.add(
      this.userControl.valueChanges
        .subscribe(v => this.loadUser(v))
    );
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  private loadUser(id: string) {
    this.userService.loadUser(id);
  }
}