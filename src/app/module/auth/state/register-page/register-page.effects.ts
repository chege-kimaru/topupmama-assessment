import { Injectable } from "@angular/core";
import { AuthHttpService } from "@core/http/auth.http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RegisterPageActions from "./register-page.actions";
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { APP_ROUTES } from "@core/constant/app-routes";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class RegisterPageEffects {

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegisterPageActions.register),
            exhaustMap(({ email, password }) => this.authHttpService.register({ email, password })
                .pipe(
                    map(({ id, token }) => RegisterPageActions.registerSuccess({ id, token })),
                    catchError((error: HttpErrorResponse) => of(RegisterPageActions.registerFailure({ error: error.error.error || 'Error' })))
                )
            )
        )
    );

    registerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegisterPageActions.registerSuccess),
            tap(({ id }) => {
                this.toastr.success('Please login to continue.', 'Registration was successful')
                this.router.navigateByUrl(APP_ROUTES.auth.login);
                // TODO: Store / Get ID from the server
                localStorage.setItem('userId', String(id));
            })
        ),
        { dispatch: false }
    );


    constructor(private actions$: Actions,
        private authHttpService: AuthHttpService,
        private router: Router,
        private toastr: ToastrService
    ) {
    }
}