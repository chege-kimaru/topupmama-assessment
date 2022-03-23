import { Injectable } from "@angular/core";
import { AuthHttpService } from "@core/http/auth.http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LoginActions from "../login/login.actions";
import * as AuthActions from "../auth/auth.actions";
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { AuthResponseDto } from "@core/dto/auth-response.dto";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { APP_ROUTES } from "@core/constant/app-routes";
import { Store } from "@ngrx/store";

@Injectable()
export class LoginEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.login),
            exhaustMap((action) => this.authHttpService.login(action.authDto)
                .pipe(
                    map((authResponseDto: AuthResponseDto) => LoginActions.loginSuccess({ authResponseDto })),
                    catchError((error: HttpErrorResponse) => of(LoginActions.loginFailure({ error: error.error.error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.loginSuccess),
            tap(action => {
                alert('Login Successful');
                // this.router.navigateByUrl();
            }),
            map((action) =>
                AuthActions.completeAuth({
                    token: action.authResponseDto.token!
                }))
        ),
    );


    constructor(private actions$: Actions,
        private authHttpService: AuthHttpService,
        private router: Router,
    ) {
    }
}