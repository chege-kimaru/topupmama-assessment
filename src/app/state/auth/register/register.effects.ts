import { Injectable } from "@angular/core";
import { AuthHttpService } from "@core/http/auth.http.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RegisterActions from "../register/register.actions";
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AuthResponseDto } from "@core/dto/auth-response.dto";
import { HttpErrorResponse } from "@angular/common/http";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { APP_ROUTES } from "@core/constant/app-routes";

@Injectable()
export class RegisterEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegisterActions.register),
            tap(action => console.log('action', action)),
            exhaustMap((action) => this.authHttpService.register(action.authDto)
                .pipe(
                    map((authResponseDto: AuthResponseDto) => RegisterActions.registerSuccess({ authResponseDto })),
                    catchError((error: HttpErrorResponse) => of(RegisterActions.registerFailure({ error: error.error.error })))
                )
            )
        )
    );

    registerSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RegisterActions.registerSuccess),
            tap((action) => {
                alert('Registration Successful. Please login');
                this.router.navigateByUrl(APP_ROUTES.auth.login);
            })
        ),
        { dispatch: false }
    );


    constructor(private actions$: Actions,
        private authHttpService: AuthHttpService,
        private router: Router
    ) {
    }
}