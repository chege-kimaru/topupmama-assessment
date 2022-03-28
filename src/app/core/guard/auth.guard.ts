import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { APP_ROUTES } from '@core/constant/app-routes';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '@state/auth/auth.reducer';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store,
    private router: Router,
    private toastr: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(selectIsLoggedIn).pipe(tap(loggedIn => {
      if (!loggedIn) {
        this.toastr.info('Please login to access this page.');
        this.router.navigateByUrl(APP_ROUTES.auth.login);
      }
    }));
  }

}