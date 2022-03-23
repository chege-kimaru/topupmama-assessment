import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';
import { LoginPageEffects } from './state/login-page/login-page.effects';
import { RegisterPageEffects } from './state/register-page/register-page.effects';
import { authModuleReducersMap } from './state';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    //TODO: store the feature key in a variable
    StoreModule.forFeature('authModule', authModuleReducersMap),
    EffectsModule.forFeature([LoginPageEffects, RegisterPageEffects])
  ]
})
export class AuthModule { }
