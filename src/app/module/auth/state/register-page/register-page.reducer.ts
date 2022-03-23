import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AuthModuleStateMap } from "..";
import { register, registerFailure, registerSuccess } from "./register-page.actions";

export interface State {
    loading: boolean;
    error: string | null;
}

export const initialState: State = {
    loading: false,
    error: null
}

export const registerReducer = createReducer(
    initialState,
    on(register, (state, _) => {
        return { ...state, loading: true, error: null }
    }),
    on(registerFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),
    on(registerSuccess, (state, { id, token }) => {
        return { ...state, loading: false }
    })
);

//TODO: store the feature key in a variable
export const selectAuthModuleState = createFeatureSelector<AuthModuleStateMap>('authModule');
export const selectState = createSelector(selectAuthModuleState, (state: AuthModuleStateMap) => state.registerPage);
export const selectLoading = createSelector(selectState, state => state.loading)
export const selectError = createSelector(selectState, state => state.error);