import { User } from "@core/model/user.model";
import { createAction, props } from "@ngrx/store";


export const loadUsers = createAction(
    '[User List API Load Users] Load Users',
    props<{ page?: number }>()
);

export const loadUsersSuccess = createAction(
    '[User List API Load Users Success] Load Users Success',
    props<{ page: number, pageSize: number, collectionSize: number, users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[User List API Load Users Failure] Load Users Failure',
    props<{ error: string }>()
);

// TODO: Separate this logic into a user-form.acions.ts file
export const addUser = createAction(
    '[User Add] Add User',
    props<{ dto: { name: string, job: string } }>()
);

export const addUserSuccess = createAction(
    '[User Add API Add User success] Add User success',
    props<{ user: User }>()
);

export const addUserFailure = createAction(
    '[User Add API Add User Failure] Add User failure',
    props<{ error: string }>()
);


export const setCurrentUser = createAction(
    '[User Set Current User] Set Current User',
    props<{ user: User }>()
);

export const removeCurrentUser = createAction(
    '[User Remove Current User] Remove Current User'
);

export const updateUser = createAction(
    '[User Update] Update User',
    props<{ userId: number, dto: { name: string, job: string } }>()
);

export const updateUserSuccess = createAction(
    '[User Update API Update User success] Update User success',
    props<{ user: User }>()
);

export const updateUserFailure = createAction(
    '[User Update API Update User Failure] Update User failure',
    props<{ error: string }>()
);

export const deleteUser = createAction(
    '[User Delete] Delete User',
    props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
    '[User Delete API Delete User success] Delete User success'
);

export const deleteUserFailure = createAction(
    '[User Delete API Delete User Failure] Delete User failure',
    props<{ error: string }>()
);