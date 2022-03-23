import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AuthModuleStateMap } from "..";
import { login, loginFailure, loginSuccess } from "./login-page.actions";

export interface State {
    loading: boolean;
    error: string | null;
}

export const initialState: State = {
    loading: false,
    error: null
}

export const loginReducer = createReducer(
    initialState,
    on(login, (state, _) => {
        return { ...state, loading: true, error: null }
    }),
    on(loginSuccess, (state, { token: string }) => {
        return { ...state, loading: false }
    }),
    on(loginFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    })
);

//TODO: store the feature key in a variable
export const selectAuthModuleState = createFeatureSelector<AuthModuleStateMap>('authModule');
export const selectState = createSelector(selectAuthModuleState, (state: AuthModuleStateMap) => state.loginPage);
export const selectLoading = createSelector(selectState, state => state.loading)
export const selectError = createSelector(selectState, state => state.error);