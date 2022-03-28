import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, delay, retryWhen, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export const maxRetries = 2;
export const delayMs = 2000;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retryWhen((error) =>
                error.pipe(
                    mergeMap((error, index) => {
                        if (index < maxRetries && error.status == 500) {
                            return of(error).pipe(delay(delayMs));
                        }

                        throw error;
                    })
                )
            ),
            catchError((error: HttpErrorResponse) => {
                let errorMsg = '';
                if (error.error instanceof ErrorEvent) {
                    errorMsg = `Client Error: ${error.error.message}`;
                }
                else {
                    errorMsg = `Server Error: ${error.error.error}`;
                }
                this.toastr.error(`Error code ${error.status}. ${errorMsg}`);
                return throwError(error);
            })
        )
    }
}