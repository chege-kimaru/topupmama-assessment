import { Component, OnDestroy } from '@angular/core';
import { APP_ROUTES } from '@core/constant/app-routes';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectToken, selectTokenExpiry, selectUser } from '@state/auth/auth.reducer';
import * as moment from 'moment';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  appRoutes = APP_ROUTES;

  token$ = this.store.select(selectToken);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  tokenExpiry$ = this.store.select(selectTokenExpiry);
  user$ = this.store.select(selectUser);
  timeToExpiry = 0;
  timeToExpirySubscription = new Subscription();

  destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.tokenExpiry$.pipe(takeUntil(this.destroy$))
      .subscribe(tokenExpiry => {
        this.timeToExpirySubscription.unsubscribe();
        this.timeToExpirySubscription = interval(1000).pipe(takeUntil(this.destroy$))
          .subscribe(_ => {
            this.timeToExpiry = moment(tokenExpiry).diff(moment(), 'seconds');
          });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
