import { User } from "@core/model/user.model";
import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { UserModuleStateMap } from "..";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./users-list.action";

export interface State {
    loading: boolean;
    error: string | null;
    users: User[];
}

export const initialState: State = {
    loading: false,
    error: null,
    users: []
}

export const usersListReducer = createReducer(
    initialState,
    on(loadUsers, (state, _) => {
        return { ...state, loading: true, error: null }
    }),
    on(loadUsersSuccess, (state, { users }) => {
        return { ...state, users, loading: false }
    }),
    on(loadUsersFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    })
);

//TODO: store the feature key in a variable
export const selectUserModuleState = createFeatureSelector<UserModuleStateMap>('userModule');
export const selectState = createSelector(selectUserModuleState, (state: UserModuleStateMap) => state.usersList);
export const selectLoading = createSelector(selectState, state => state.loading)
export const selectError = createSelector(selectState, state => state.error);
export const selectUsers = createSelector(selectState, state => state.users);