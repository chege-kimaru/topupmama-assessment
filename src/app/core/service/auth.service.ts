import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { refreshToken } from "@state/auth/auth/auth.actions";
import * as moment from 'moment';
import { interval, Subscription } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

    tokenExpiryTimerSubscriber: Subscription = new Subscription();

    constructor(private store: Store) {

    }

    setTokenExpiryTimer(tokenExpiry: Date) {
        this.tokenExpiryTimerSubscriber.unsubscribe();
        this.tokenExpiryTimerSubscriber = interval(1000).subscribe(_ => {
            if (moment().isAfter(moment(tokenExpiry))) {
                // refresh token
                this.store.dispatch(refreshToken());
                this.tokenExpiryTimerSubscriber.unsubscribe();
            }
        });
    }

    getToken(): { token: string | null, tokenExpiry: moment.Moment | null } {
        const token = localStorage.getItem('token');
        const tokenExpiry = moment(localStorage.getItem('tokenExpiry'));
        return { token, tokenExpiry: tokenExpiry ? tokenExpiry : null };
    }

    setToken(token: string) {
        const tokenExpiry = moment().add(20, "seconds");
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', tokenExpiry.format());
        return { token, tokenExpiry: tokenExpiry.toDate() };
    }

    removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
    }
}