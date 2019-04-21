import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { User, AuthToken } from 'src/app/moduls/user';

@Injectable()
export class AuthService {
  navigate(arg0: string[]) {
    throw new Error("Method not implemented.");
  }

  url: string = environment.apiUrl + '/auth';
  sessionName: string = 'current-user';

  constructor(
    private http: HttpClient
  ) { }

  findUsername(username: string): Observable<any> {
    return timer(1000)
      .pipe(
        switchMap(() => {
          return this.http.get(`${this.url}/user/username?name=${username}`);
        })
      )
  }



  signup(user: User): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.url}/signup`, user);
  }

  findEmail(email: string): Observable<any> {
    return timer(1000)
      .pipe(
        switchMap(() => {
          return this.http.get(`${this.url}/user/email?email=${email}`);
        })
      )
  }

  getAuth(): Observable<User> {
    return this.http.get<User>(`${this.url}/user`, {
      headers: {
        'Authorization': 'Bearer ' + this.getAuthToken().token
      }
    });
  }

  getAuthToken(): AuthToken {
    let token: AuthToken = null;

    if (localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token'));
    }

    return token;
  }

  setAuthToken(token: AuthToken): void {
    localStorage.setItem('token', JSON.stringify(token))
  }

  getAuthUser(): User {
    let user: User = null;

    if (localStorage.getItem(this.sessionName)) {
      user = JSON.parse(localStorage.getItem(this.sessionName));
    }

    return user;
  }

  setAuthUser(user: User): void {
    localStorage.setItem(this.sessionName, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return this.getAuthUser() !== null
  }

  deleteAuth(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('sessionName');
  }

  authenticate(params: {email: string, password: string}): Observable<AuthToken>{
    return this.http.post<AuthToken>(`${this.url}/login`,params);
  }
}
