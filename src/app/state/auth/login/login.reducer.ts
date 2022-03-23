import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess } from "./login.actions";

export interface State {
    loginLoading: boolean;
    error: string | null;
}

export const initialState: State = {
    loginLoading: false,
    error: null
}

export const loginReducer = createReducer(
    initialState,
    on(login, (state, _) => {
        return { ...state, loginLoading: true, error: null }
    }),
    on(loginSuccess, (state, { authResponseDto: AuthResponseDto }) => {
        return { ...state, loginLoading: false }
    }),
    on(loginFailure, (state, { error }) => {
        return { ...state, error, loginLoading: false }
    })
);

export const selectLoginState = createFeatureSelector<State>('login');
export const selectLoginLoading = createSelector(selectLoginState, state => state.loginLoading)
export const selectError = createSelector(selectLoginState, state => state.error);