import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseDto } from '@core/dto/auth-response.dto';
import { AuthDto } from '@core/dto/auth.dto';
import { User } from '@core/model/user.model';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  constructor(private http: HttpClient) { }

  register(dto: AuthDto): Observable<AuthResponseDto> {
    return this.http.post(`${environment.BASE_URL}/register`, dto, { headers: { 'no-auth': 'true' } });
  }

  login(dto: AuthDto): Observable<AuthResponseDto> {
    return this.http.post(`${environment.BASE_URL}/login`, dto, { headers: { 'no-auth': 'true' } });
  }

  //  TODO: simulation of refresh token
  // hiting the login endpoint so that we can get a new token
  refreshToken(): Observable<AuthResponseDto> {
    const dummyCredentials = {
      email: 'janet.weaver@reqres.in',
      password: '123456'
    };
    return this.http.post(`${environment.BASE_URL}/login`, dummyCredentials);
  }

}
