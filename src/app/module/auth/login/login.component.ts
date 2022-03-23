import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromLogin from '@state/auth/login/login.reducer';
import * as loginActions from '@state/auth/login/login.actions';
import { APP_ROUTES } from '@core/constant/app-routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  appRoutes = APP_ROUTES;

  form: FormGroup;
  error$ = this.store.select(fromLogin.selectError);
  loading$ = this.store.select(fromLogin.selectLoginLoading);

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.form.get('name'); }

  get password() { return this.form.get('password'); }

  ngOnInit(): void {
  }

  login(): void {
    this.store.dispatch(loginActions.login({ authDto: this.form.value }));
  }

}
