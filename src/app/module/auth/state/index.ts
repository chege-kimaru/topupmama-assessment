import { createFeatureSelector } from '@ngrx/store';
import * as fromLoginPagesreducer from './login-page/login-page.reducer';
import * as fromRegisterPagesreducer from './register-page/register-page.reducer';

export const authModuleReducersMap = {
    loginPage: fromLoginPagesreducer.loginReducer,
    registerPage: fromRegisterPagesreducer.registerReducer,
}

export interface AuthModuleStateMap {
    loginPage: fromLoginPagesreducer.State;
    registerPage: fromRegisterPagesreducer.State;
}