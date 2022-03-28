import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '@state/auth/auth.reducer';
import * as fromAccount from './state/account.reducer';
import * as AccountActions from './state/account.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APP_ROUTES } from '@core/constant/app-routes';
import { takeUntil } from 'rxjs/operators';
import { User } from '@core/model/user.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  appRoutes = APP_ROUTES;

  destroy$ = new Subject();

  user$ = this.store.select(fromAuth.selectUser);
  user?: User | null;

  form: FormGroup;
  error$ = this.store.select(fromAccount.selectError);
  loading$ = this.store.select(fromAccount.selectLoading);

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

  showPassword = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.user$.pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        this.form = this.fb.group({
          email: [this.user?.email, [Validators.required]],
          name: [this.user?.name || `${this.user?.first_name} ${this.user?.last_name}`, [Validators.required]],
          password: ['', [Validators.pattern(this.passwordPattern)]]
        });
      });

    this.form = this.fb.group({
      email: [this.user?.email, [Validators.required]],
      name: [this.user?.name || `${this.user?.first_name} ${this.user?.last_name}`, [Validators.required]],
      password: ['', [Validators.pattern(this.passwordPattern)]]
    });
  }

  get name() { return this.form.get('name'); }

  get password() { return this.form.get('password'); }

  ngOnInit(): void {
  }

  updateProfile(): void {
    this.store.dispatch(AccountActions.updateProfile({ ...this.form.value }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
