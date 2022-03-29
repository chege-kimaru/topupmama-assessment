import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { Store } from '@ngrx/store';
import { selectToken } from '@state/auth/auth.reducer';
import { exhaustMap, retry } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService,
    private store: Store) {

  }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.has('no-auth')) return next.handle(req.clone());

    const token$ = this.store.select(selectToken);
    return token$.pipe(exhaustMap(token => {
      if (token) {
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(clonedReq);
      } else {
        return next.handle(req.clone());
      }
    }));
  }
}
