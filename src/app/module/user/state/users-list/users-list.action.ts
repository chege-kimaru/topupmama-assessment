import { User } from "@core/model/user.model";
import { createAction, props } from "@ngrx/store";


export const loadUsers = createAction(
    '[User List API Load Users] Load Users'
);

export const loadUsersSuccess = createAction(
    '[User List API Load Users Success] Load Users Success',
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[User List API Load Users Failure] Load Users Failure',
    props<{ error: string }>()
);