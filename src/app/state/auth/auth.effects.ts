import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { APP_ROUTES } from "@core/constant/app-routes";
import { AuthHttpService } from "@core/http/auth.http.service";
import { User } from "@core/model/user.model";
import { AuthService } from "@core/service/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ToastrService } from "ngx-toastr";
import { concat, EMPTY, from, of, throwError } from "rxjs";
import { catchError, concatMap, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { completeAuth, loadUser, logout, refreshToken, refreshTokenSuccess, setTokenExpiry, setUser } from "./auth.actions";

@Injectable()
export class AuthEffects {

    completeAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(completeAuth),
            concatMap(({ token }) => {
                const { tokenExpiry } = this.authService.setToken(token);
                return from([setTokenExpiry({ tokenExpiry }), loadUser()]);
            })
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

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            switchMap(_ => this.authHttpService.getProfile()
                .pipe(
                    map((user: User) => {
                        return setUser({ user });
                    }),
                    // TODO: Complete auth failed
                    catchError(error => EMPTY)
                )
            ),
        )
    );

    refreshToken$ = createEffect(() =>
        this.actions$.pipe(
            ofType(refreshToken),
            tap(_ => this.toastr.info('Refreshing token...')),
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

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logout),
            tap(action => {
                this.router.navigateByUrl(APP_ROUTES.auth.login);
            }),
        ),
        { dispatch: false }
    );


    constructor(private actions$: Actions,
        private authService: AuthService,
        private authHttpService: AuthHttpService,
        private router: Router,
        private toastr: ToastrService
    ) { }
}