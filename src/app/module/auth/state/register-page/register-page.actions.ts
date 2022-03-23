import { AuthResponseDto } from "@core/dto/auth-response.dto";
import { AuthDto } from "@core/dto/auth.dto";
import { createAction, props } from "@ngrx/store";

export const register = createAction(
    '[Register Page register] Register',
    props<{ email: string, password: string }>()
);

export const registerSuccess = createAction(
    '[Register API Register Success] Register Success',
    props<{ id: number, token: string }>()
);

export const registerFailure = createAction(
    '[Register API Register Failure] Register Failure',
    props<{ error: string }>()
);