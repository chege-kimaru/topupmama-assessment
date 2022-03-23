import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserHttpService } from "@core/http/user.http.service";
import { User } from "@core/model/user.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { loadUsers, loadUsersFailure, loadUsersSuccess } from "./users-list.action";

@Injectable()
export class UsersListEffects {

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            exhaustMap(_ => this.userHttpService.getUsers()
                .pipe(
                    map((users: User[]) => loadUsersSuccess({ users })),
                    catchError((error: HttpErrorResponse) => of(loadUsersFailure({ error: error.error.error })))
                )
            )
        )
    );



    constructor(private actions$: Actions, private userHttpService: UserHttpService) { }
}