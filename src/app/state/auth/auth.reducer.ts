import { User } from "@core/model/user.model";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as moment from "moment";
import { completeAuth, logout, refreshTokenSuccess, setTokenExpiry, setUser } from "./auth.actions";

export interface State {
    token: string | null;
    tokenExpiry: Date | null,
    isLoggedIn: boolean;
    user: User | null;
}

export const initialState: State = {
    token: null,
    tokenExpiry: null,
    isLoggedIn: false,
    user: null
}

export const authReducer = createReducer(
    initialState,
    on(completeAuth, (state, { token }) => {
        return { ...state, token, isLoggedIn: true }
    }),
    on(setUser, (state, { user }) => {
        return { ...state, user }
    }),
    on(setTokenExpiry, (state, { tokenExpiry }) => {
        return { ...state, tokenExpiry }
    }),
    on(refreshTokenSuccess, (state, { token }) => {
        return { ...state, token }
    }),
    on(logout, (state, _) => {
        return {
            ...state,
            isLoggedIn: false,
            user: null,
            token: null,
            tokenExpiry: null,
        }
    })
);

export const selectAuthState = createFeatureSelector<State>('auth');
export const selectToken = createSelector(selectAuthState, state => state.token);
export const selectTokenExpiry = createSelector(selectAuthState, state => state.tokenExpiry);
export const selectIsLoggedIn = createSelector(selectAuthState, state => state.isLoggedIn);
export const selectUser = createSelector(selectAuthState, state => state.user);