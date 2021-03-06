import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APP_ROUTES } from '@core/constant/app-routes';
import { Store } from '@ngrx/store';
import { CustomValidators } from '@shared/custom-validators';
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

  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-.]).{8,12}$/;

  showPassword = false;
  showCPassword = false;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      cpassword: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    },
      { validators: CustomValidators.mustMatch('password', 'cpassword') }
    );
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }

  get cpassword() { return this.form.get('cpassword'); }

  ngOnInit(): void {
  }

  register(): void {
    const data = { ...this.form.value };
    delete data.cpassword;
    this.store.dispatch(RegisterActions.register({ ...data }));
  }

}
