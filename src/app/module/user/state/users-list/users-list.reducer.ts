import { User } from "@core/model/user.model";
import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { UserModuleStateMap } from "..";
import { addUser, addUserFailure, addUserSuccess, deleteUser, deleteUserFailure, deleteUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, removeCurrentUser, setCurrentUser, updateUser, updateUserFailure, updateUserSuccess } from "./users-list.action";

export interface State {
    loading: boolean;
    error: string | null;
    users: User[];
    // to persist added users on refresh
    addedUsers: User[];

    // for pagination
    page: number,
    pageSize: number,
    collectionSize: number

    submitting: boolean,
    submitError: string | null,
    currentUser: User | null,

    userToDelete: User | null,
    deleting: boolean,
    deleteError: string | null
}

export const initialState: State = {
    loading: false,
    error: null,
    users: [],
    addedUsers: [],

    page: 1,
    pageSize: 20,
    collectionSize: 0,

    submitting: false,
    submitError: null,
    currentUser: null,

    deleting: false,
    deleteError: null,
    userToDelete: null
}

export const usersListReducer = createReducer(
    initialState,
    on(loadUsers, (state, _) => {
        return { ...state, loading: true, error: null }
    }),
    on(loadUsersSuccess, (state, { users, page, pageSize, collectionSize }) => {
        return { ...state, users: page == 1 ? [...state.addedUsers, ...users] : users, page, pageSize, collectionSize, loading: false }
    }),
    on(loadUsersFailure, (state, { error }) => {
        return { ...state, error, loading: false }
    }),

    // TODO: Separate this logic into a user-form.reducer.ts file
    on(setCurrentUser, (state, { user }) => {
        return { ...state, currentUser: { ...user } }
    }),

    on(removeCurrentUser, (state, _) => {
        return { ...state, currentUser: null }
    }),
    on(addUser, (state, _) => {
        return { ...state, submitting: true, submitError: null }
    }),
    on(addUserSuccess, (state, { user }) => {
        return { ...state, submitting: false, users: [user, ...state.users], addedUsers: [user, ...state.addedUsers] }
    }),
    on(addUserFailure, (state, { error }) => {
        return { ...state, submitting: false, submitError: error }
    }),
    on(updateUser, (state, _) => {
        return { ...state, submitting: true, submitError: null }
    }),
    on(updateUserSuccess, (state, { user }) => {
        return {
            ...state, currentUser: null, submitting: false, users: state.users.map(u => {
                if (u.id == state.currentUser?.id) return { ...state.currentUser, ...user };
                return u;
            })
        }
    }),
    on(updateUserFailure, (state, { error }) => {
        return { ...state, submitting: false, submitError: error }
    }),


    on(deleteUser, (state, { user }) => {
        return { ...state, userToDelete: { ...user }, deleting: true, deleteError: null }
    }),
    on(deleteUserSuccess, (state, _) => {
        return {
            ...state, deleting: false, userToDelete: null,
            users: state.users.filter(u => u.id !== state.userToDelete?.id),
            addedUsers: state.addedUsers.filter(u => u.id !== state.userToDelete?.id)
        }
    }),
    on(deleteUserFailure, (state, { error }) => {
        return { ...state, deleting: false, deleteError: error, userToDelete: null }
    })
);

//TODO: store the feature key in a variable
export const selectUserModuleState = createFeatureSelector<UserModuleStateMap>('userModule');
export const selectState = createSelector(selectUserModuleState, (state: UserModuleStateMap) => state.usersList);
export const selectLoading = createSelector(selectState, state => state.loading)
export const selectError = createSelector(selectState, state => state.error);
export const selectUsers = createSelector(selectState, state => state.users);

export const selectPage = createSelector(selectState, state => state.page);
export const selectPageSize = createSelector(selectState, state => state.pageSize);
export const selectCollecionSize = createSelector(selectState, state => state.collectionSize);

export const selectCurrentUser = createSelector(selectState, state => state.currentUser);
export const selectSubmitting = createSelector(selectState, state => state.submitting);
export const selectsubmitError = createSelector(selectState, state => state.submitError);

export const selectDeleting = createSelector(selectState, state => state.deleting);
export const selectDeleteError = createSelector(selectState, state => state.deleteError);
export const selectUserToDelete = createSelector(selectState, state => state.userToDelete);