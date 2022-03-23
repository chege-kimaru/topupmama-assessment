import { AuthResponseDto } from "@core/dto/auth-response.dto";
import { AuthDto } from "@core/dto/auth.dto";
import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Auth Login] Login',
    props<{ authDto: AuthDto }>()
);

export const loginSuccess = createAction(
    '[Auth Login Success] Login Success',
    props<{ authResponseDto: AuthResponseDto }>()
);

export const loginFailure = createAction(
    '[Auth Login Failure] Login Failure',
    props<{ error: string }>()
);