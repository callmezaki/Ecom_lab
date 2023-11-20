import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable, Subject, tap } from 'rxjs';
import { environment as env } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private ROOT_URL: String = 'http://springtc.eu-north-1.elasticbeanstalk.com';
  private usersUrl = `http://${env.apiUrl}/api/users`;
  private deleteUrl = `http://${env.apiUrl}/api/delete`;

  constructor(private httpClient: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.usersUrl);
  }
  deleteUser(user: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.deleteUrl}/${user}`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
