import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { register, registerFailure, registerSuccess } from "./register.actions";

export interface State {
    registerLoading: boolean;
    error: string | null;
}

export const initialState: State = {
    registerLoading: false,
    error: null
}

export const registerReducer = createReducer(
    initialState,
    on(register, (state, _) => {
        return { ...state, registerLoading: true, error: null }
    }),
    on(registerFailure, (state, { error }) => {
        return { ...state, error, registerLoading: false }
    }),
    on(registerSuccess, (state, { authResponseDto: AuthResponseDto }) => {
        return { ...state, registerLoading: false }
    })
);

export const selectRegisterState = createFeatureSelector<State>('register');
export const selectRegisterLoading = createSelector(selectRegisterState, state => state.registerLoading)
export const selectError = createSelector(selectRegisterState, state => state.error);