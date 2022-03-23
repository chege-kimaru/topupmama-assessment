import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHttpService } from "@core/http/auth.http.service";
import { User } from "@core/model/user.model";
import { AuthService } from "@core/service/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { completeAuth, refreshToken, refreshTokenSuccess, setTokenExpiry } from "./auth.actions";

@Injectable()
export class AuthEffects {

    completeAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(completeAuth),
            map(action => {
                const { token, tokenExpiry } = this.authService.setToken(action.token);
                return setTokenExpiry({ tokenExpiry });
            }),
        )
    );

    setTokenExpiry$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setTokenExpiry),
            tap(action => {
                this.authService.setTokenExpiryTimer(action.tokenExpiry);
            }),
        ),
        { dispatch: false }
    );

    refreshToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(refreshToken),
            switchMap(_ => this.authHttpService.refreshToken()
                .pipe(
                    map(({ token }) => refreshTokenSuccess({ token: token! })),
                    // TODO: refresh token failuer
                    catchError((error: HttpErrorResponse) => EMPTY)
                )
            ),
        ),
    );

    refreshTokenSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(refreshTokenSuccess),
            map(action => {
                const { token, tokenExpiry } = this.authService.setToken(action.token);
                return setTokenExpiry({ tokenExpiry });
            }),
        ),
    );


    constructor(private actions$: Actions,
        private authService: AuthService,
        private authHttpService: AuthHttpService,
        private router: Router
    ) { }
}