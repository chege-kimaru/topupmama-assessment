import { AuthResponseDto } from "@core/dto/auth-response.dto";
import { AuthDto } from "@core/dto/auth.dto";
import { createAction, props } from "@ngrx/store";

export const register = createAction(
    '[Auth Register] Register',
    props<{ authDto: AuthDto }>()
);

export const registerSuccess = createAction(
    '[Auth Register Success] Register Success',
    props<{ authResponseDto: AuthResponseDto }>()
);

export const registerFailure = createAction(
    '[Auth Register Failure] Register Failure',
    props<{ error: string }>()
);