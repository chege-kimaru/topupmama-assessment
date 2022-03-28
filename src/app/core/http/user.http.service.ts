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

  getUsers(page?: number): Observable<{ users: User[], page: number, pageSize: number, collectionSize: number }> {
    return this.http.get(`${environment.BASE_URL}/users`, { params: { page: String(page) } })
      .pipe(map((res: any) => {
        return { users: res.data, page: res.page, pageSize: res.per_page, collectionSize: res.total }
      }));
  }

  addUser(dto: { name: string, job: string }): Observable<User> {
    return this.http.post(`${environment.BASE_URL}/users`, dto)
      .pipe(map((res: any) => res));
  }

  updateUser(userId: number, dto: { name: string, job: string }): Observable<User> {
    return this.http.put(`${environment.BASE_URL}/users/${userId}`, dto)
      .pipe(map((res: any) => res));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/users/${userId}`)
      .pipe(map((res: any) => res));
  }
}
