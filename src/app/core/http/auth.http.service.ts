import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDto } from '@core/dto/auth-response.dto';
import { AuthDto } from '@core/dto/auth.dto';
import { User } from '@core/model/user.model';
import { environment } from '@env';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(private http: HttpClient) { }

  register(dto: { email: string, password: string }): Observable<{ id: number, token: string }> {
    return this.http.post(`${environment.BASE_URL}/register`, dto, { headers: { 'no-auth': 'true' } })
      .pipe(tap((res: any) => {
        // TODO: store password on the server
        if (res.id)
          localStorage.setItem('password', dto.password);
      }),
        map((res: any) => res)
      );
  }

  login(dto: { email: string, password: string }): Observable<{ token: string }> {
    // TODO: compare password with one stored on server
    if (dto.password !== localStorage.getItem('password'))
      return throwError(new HttpErrorResponse({ error: { error: 'Incorrect Password' } }));
    return this.http.post(`${environment.BASE_URL}/login`, dto, { headers: { 'no-auth': 'true' } })
      .pipe((res: any) => res);
  }

  //  TODO: simulation of refresh token
  // hiting the login endpoint so that we can get a new token
  refreshToken(): Observable<{ token: string }> {
    const dummyCredentials = {
      email: 'janet.weaver@reqres.in',
      password: '123456'
    };
    return this.http.post(`${environment.BASE_URL}/login`, dummyCredentials)
      .pipe((res: any) => res);
  }

  getProfile(): Observable<User> {
    // TODO: We do not need user Id for a real app
    const userId = localStorage.getItem('userId');
    return this.http.get(`${environment.BASE_URL}/users/${userId}`)
      .pipe(map((res: any) => res.data));
  }

  updateProfile(name: string, password: string): Observable<User> {
    // TODO: We do not need user Id for a real app
    const userId = localStorage.getItem('userId');
    return this.http.put(`${environment.BASE_URL}/users/${userId}`, { name })
      .pipe(tap((res: any) => {
        // TODO: store password on the server
        if (res.name)
          localStorage.setItem('password', password);
      }),
        map((res: any) => res)
      );
  }

}
