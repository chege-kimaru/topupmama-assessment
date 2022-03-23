import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/model/user.model';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get(`${environment.BASE_URL}/users`)
      .pipe(map((res: any) => res.data));
  }
}
