import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserHttpService } from "@core/http/user.http.service";
import { User } from "@core/model/user.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, switchMap, tap } from "rxjs/operators";
import { addUser, addUserFailure, addUserSuccess, deleteUser, deleteUserFailure, deleteUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, updateUser, updateUserFailure, updateUserSuccess } from "./users-list.action";

@Injectable()
export class UsersListEffects {

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers),
            switchMap(({ page }) => this.userHttpService.getUsers(page)
                .pipe(
                    map(({ users, page, pageSize, collectionSize }) =>
                        loadUsersSuccess({ users, page, pageSize, collectionSize })
                    ),
                    catchError((error: HttpErrorResponse) => of(loadUsersFailure({ error: error.error.error })))
                )
            )
        )
    );

    // TODO: Separate this logic into a user-form.efects.ts file
    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            switchMap(({ dto }) => this.userHttpService.addUser(dto)
                .pipe(
                    map((user: User) => addUserSuccess({ user })),
                    catchError((error: HttpErrorResponse) => of(addUserFailure({ error: error.error.error || 'Error' })))
                )
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            switchMap(({ userId, dto }) => this.userHttpService.updateUser(userId, dto)
                .pipe(
                    map((user: User) => updateUserSuccess({ user })),
                    catchError((error: HttpErrorResponse) => of(updateUserFailure({ error: error.error.error || 'Error' })))
                )
            )
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUser),
            switchMap(({ user }) => this.userHttpService.deleteUser(user.id!)
                .pipe(
                    map((user: User) => deleteUserSuccess()),
                    catchError((error: HttpErrorResponse) => of(deleteUserFailure({ error: error.error.error || 'Error' })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private userHttpService: UserHttpService) { }
}