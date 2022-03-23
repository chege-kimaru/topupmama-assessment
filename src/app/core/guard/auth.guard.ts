import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { APP_ROUTES } from '@core/constant/app-routes';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '@state/auth/auth.reducer';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return this.authService.isAuthenticated().pipe(tap(authenticated => {
    //   if (!authenticated)
    //     this.router.navigate([APP_ROUTES.AUTH.SEND_OTP], { queryParams: { next: state.url } })
    //       .then(_ => {
    //         this.toastr.info('Please login to continue to this page.');
    //       });
    // }));

    return this.store.select(selectIsLoggedIn).pipe(tap(loggedIn => {
      if (!loggedIn) {
        this.router.navigateByUrl(APP_ROUTES.auth.login);
      }
    }));
  }

}