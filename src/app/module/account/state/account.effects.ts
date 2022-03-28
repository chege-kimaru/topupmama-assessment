import { Injectable } from "@angular/core";
import { AuthHttpService } from "@core/http/auth.http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AccountActions from "./account.actions";
import * as AuthActions from "@state/auth/auth.actions";
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { APP_ROUTES } from "@core/constant/app-routes";
import { ToastrService } from "ngx-toastr";
import { User } from "@core/model/user.model";

@Injectable()
export class AccountEffects {

    updateProfile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.updateProfile),
            exhaustMap(({ name, password }) => this.authHttpService.updateProfile(name, password)
                .pipe(
                    map((user: User) => AccountActions.updateProfileSuccess({ user }),
                        catchError((error: HttpErrorResponse) => of(AccountActions.updateProfileFailure({ error: error.error.error || 'Error' })))
                    )
                )
            )
        ));

    updateProfileSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccountActions.updateProfileSuccess),
            map(({ user }) => AuthActions.setUser({ user }))
        ),
    );


    constructor(private actions$: Actions,
        private authHttpService: AuthHttpService,
    ) {
    }
}