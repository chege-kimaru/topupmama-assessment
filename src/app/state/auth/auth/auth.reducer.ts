import { User } from "@core/model/user.model";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as moment from "moment";
import { completeAuth, refreshTokenSuccess, setTokenExpiry } from "./auth.actions";

export interface State {
    token: string | null;
    tokenExpiry: Date | null,
    isLoggedIn: boolean;
}

export const initialState: State = {
    token: null,
    tokenExpiry: null,
    isLoggedIn: false,
}

export const authReducer = createReducer(
    initialState,
    on(completeAuth, (state, { token }) => {
        return { ...state, token, isLoggedIn: true }
    }),
    on(setTokenExpiry, (state, { tokenExpiry }) => {
        return { ...state, tokenExpiry }
    }),
    on(refreshTokenSuccess, (state, { token }) => {
        return { ...state, token }
    }),
);

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectToken = createSelector(selectAuthState, state => state.token);
export const selectTokenExpiry = createSelector(selectAuthState, state => state.tokenExpiry);
export const selectIsLoggedIn = createSelector(selectAuthState, state => state.isLoggedIn);