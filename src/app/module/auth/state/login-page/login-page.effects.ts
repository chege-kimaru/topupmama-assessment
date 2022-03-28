import { Injectable } from "@angular/core";
import { AuthHttpService } from "@core/http/auth.http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as LoginPageActions from "./login-page.actions";
import * as AuthActions from "@state/auth/auth.actions";
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { APP_ROUTES } from "@core/constant/app-routes";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class LoginPageEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginPageActions.login),
            exhaustMap(({ email, password }) => this.authHttpService.login({ email, password })
                .pipe(
                    map(({ token }) => LoginPageActions.loginSuccess({ token })),
                    catchError((error: HttpErrorResponse) => of(LoginPageActions.loginFailure({ error: error.error.error || 'Error' })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginPageActions.loginSuccess),
            tap(_ => {
                this.toastr.success('Welcome back', 'Login successful');
                this.router.navigateByUrl(APP_ROUTES.user.list);
            }),
            map(({ token }) =>
                AuthActions.completeAuth({ token }))
        ),
    );


    constructor(private actions$: Actions,
        private authHttpService: AuthHttpService,
        private router: Router,
        private toastr: ToastrService
    ) {
    }
}