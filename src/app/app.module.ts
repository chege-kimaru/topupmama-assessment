import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffects } from './state/auth/register/register.effects';
import { LoginEffects } from './state/auth/login/login.effects';
import * as fromLoginReducer from './state/auth/login/login.reducer';
import * as fromRegisterReducer from './state/auth/register/register.reducer';
import * as fromAuthReducer from './state/auth/auth/auth.reducer';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from '@state/auth/auth/auth.effects';
import { environment } from '@env';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      login: fromLoginReducer.loginReducer,
      register: fromRegisterReducer.registerReducer,
      auth: fromAuthReducer.authReducer
    }),
    EffectsModule.forRoot([RegisterEffects, LoginEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
