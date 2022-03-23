import { User } from "@core/model/user.model";
import { createAction, props } from "@ngrx/store";

export const completeAuth = createAction(
    '[Auth Complete Auth] Complete Auth',
    props<{ token: string }>()
);

export const setTokenExpiry = createAction(
    '[Auth Set Token Expiry] SetToken Expiry',
    props<{ tokenExpiry: Date }>()
);

export const setUser = createAction(
    '[Auth Set User] Set User',
    props<{ user: User }>()
);

export const loadUser = createAction(
    '[Auth Load User] Load User'
);

export const refreshToken = createAction(
    '[Auth Refresh Token] Refresh Token',
);

export const refreshTokenSuccess = createAction(
    '[Auth API Refresh Token Success] Refresh Token Success',
    props<{ token: string }>()
);