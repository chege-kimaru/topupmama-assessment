import { updateUser, updateUserFailure, updateUserSuccess } from "@app/module/user/state/users-list/users-list.action";
import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { AccountModuleStateMap } from ".";
import { updateProfile, updateProfileFailure, updateProfileSuccess } from "./account.actions";

export interface State {
    loading: boolean;
    error: string | null;
}

export const initialState: State = {
    loading: false,
    error: null
}

export const accountReducer = createReducer(
    initialState,
    on(updateProfile, (state, _) => {
        return { ...state, loading: true, error: null }
    }),
    on(updateProfileSuccess, (state, _) => {
        return { ...state, loading: false }
    }),
    on(updateProfileFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    })
);

//TODO: store the feature key in a variable
export const selectAccountModuleState = createFeatureSelector<AccountModuleStateMap>('accountModule');
export const selectState = createSelector(selectAccountModuleState, (state: AccountModuleStateMap) => state.account);
export const selectLoading = createSelector(selectState, state => state.loading)
export const selectError = createSelector(selectState, state => state.error);