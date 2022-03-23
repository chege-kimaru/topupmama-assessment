import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from '@state/auth/auth.reducer';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user$ = this.store.select(selectUser);

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
