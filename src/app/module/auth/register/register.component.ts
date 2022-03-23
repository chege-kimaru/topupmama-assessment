import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APP_ROUTES } from '@core/constant/app-routes';
import { Store } from '@ngrx/store';
import * as RegisterActions from '../state/register-page/register-page.actions';
import * as fromRegister from '../state/register-page/register-page.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  appRoutes = APP_ROUTES;

  form: FormGroup;
  error$ = this.store.select(fromRegister.selectError);
  loading$ = this.store.select(fromRegister.selectLoading);

  constructor(private fb: FormBuilder, private store: Store<fromRegister.State>) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get email() { return this.form.get('name'); }

  get password() { return this.form.get('password'); }

  ngOnInit(): void {
  }

  register(): void {
    this.store.dispatch(RegisterActions.register({ ...this.form.value }));
  }

}
