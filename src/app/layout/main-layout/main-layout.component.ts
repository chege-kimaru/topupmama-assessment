import { Component, OnDestroy, OnInit } from '@angular/core';
import { APP_ROUTES } from '@core/constant/app-routes';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectTokenExpiry, selectUser } from '@state/auth/auth.reducer';
import * as moment from 'moment';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as authActions from '@state/auth/auth.actions';
import { UtilService } from '@core/service/util.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  isNavbarCollapsed = true;

  destroy$ = new Subject<void>();

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  user$ = this.store.select(selectUser);

  tokenExpiry$ = this.store.select(selectTokenExpiry);
  timeToExpiry = 0;
  timeToExpirySubscription = new Subscription();

  appRoutes = APP_ROUTES;

  myLocation$ = this.utilService.myLocation();

  constructor(private store: Store, private utilService: UtilService) {
    this.tokenExpiry$.pipe(takeUntil(this.destroy$))
      .subscribe(tokenExpiry => {
        this.timeToExpirySubscription.unsubscribe();
        if (tokenExpiry)
          this.timeToExpirySubscription = interval(1000).pipe(takeUntil(this.destroy$))
            .subscribe(_ => {
              this.timeToExpiry = moment(tokenExpiry).diff(moment(), 'seconds');

            });
        else
          this.timeToExpirySubscription.unsubscribe();
      });
  }

  ngOnInit(): void {

  }

  get timeToExpiryFormated() {
    return `0${Math.floor(this.timeToExpiry / 60)}:${this.timeToExpiry % 60 < 10 ? '0' : ''}${this.timeToExpiry % 60}`;
  }

  logout() {
    this.store.dispatch(authActions.logout());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
