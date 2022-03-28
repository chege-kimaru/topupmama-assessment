import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadUsers } from '../state/users-list/users-list.action';
import { selectCurrentUser, selectDeleteError, selectDeleting, selectsubmitError, selectSubmitting, selectUsers, selectUserToDelete } from '../state/users-list/users-list.reducer';

import * as UserActions from '../state/users-list/users-list.action';
import { User } from '@core/model/user.model';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  users$ = this.store.select(selectUsers);

  currentUser$ = this.store.select(selectCurrentUser);
  currentUser?: User | null;

  submitting$ = this.store.select(selectSubmitting);
  submitError$ = this.store.select(selectsubmitError);

  deleting$ = this.store.select(selectDeleting);
  deleteError$ = this.store.select(selectDeleteError);
  userToDelete$ = this.store.select(selectUserToDelete);

  form: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    this.currentUser$.pipe(takeUntil(this.destroy$))
      .subscribe(currentUser => {
        this.currentUser = currentUser;

        if (this.currentUser) {
          this.form = this.fb.group({
            name: [this.currentUser.name || `${this.currentUser.first_name} ${this.currentUser.last_name}`, Validators.required],
            job: [this.currentUser.job, Validators.required],
          });
        } else {
          this.form = this.fb.group({
            name: ['', Validators.required],
            job: ['', Validators.required],
          });
        }
      });

    this.form = this.fb.group({
      name: ['', Validators.required],
      job: ['', Validators.required],
    });
  }

  get name() {
    return this.form.get('name');
  }

  get job() {
    return this.form.get('job');
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  startEditing(user: User) {
    this.store.dispatch(UserActions.setCurrentUser({ user }));
  }

  stopEditing() {
    this.store.dispatch(UserActions.removeCurrentUser());
  }

  deleteUser(user: User) {
    this.store.dispatch(UserActions.deleteUser({ user }));
  }

  submit() {
    if (this.currentUser) {
      this.store.dispatch(UserActions.updateUser({ userId: this.currentUser?.id!, dto: this.form.value }));
    } else {
      this.store.dispatch(UserActions.addUser({ dto: this.form.value }));
      this.form.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
