import { AuthDto } from "@core/dto/auth.dto";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Login Page Login] Login',
    props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
    '[Login API Login Success] Login Success',
    props<{ token: string }>()
);

export const loginFailure = createAction(
    '[Login API Login Failure] Login Failure',
    props<{ error: string }>()
);