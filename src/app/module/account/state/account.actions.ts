import { User } from "@core/model/user.model";
import { createAction, props } from "@ngrx/store";

export const updateProfile = createAction(
    '[Account Update] Update Account',
    props<{ name: string, password: string }>()
);

export const updateProfileSuccess = createAction(
    '[Account API Update Success] Update Success',
    props<{ user: User }>()
);

export const updateProfileFailure = createAction(
    '[Account API Update Failure] Update Failure',
    props<{ error: string }>()
);