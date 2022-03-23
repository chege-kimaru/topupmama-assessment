import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from '../state/users-list/users-list.action';
import { selectUsers } from '../state/users-list/users-list.reducer';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users$ = this.store.select(selectUsers);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

}
