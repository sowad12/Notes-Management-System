import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/auth/user';
import { Root } from '../_models/root';
import { Login } from '../_models/auth/login';
import { register } from '../_models/auth/register';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSource = new ReplaySubject<Root<User> | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { 
   
  }
  login(model: Login) {
    return this.http.post<Root<User>>(environment.baseUrl + 'auth/login', model).pipe(
      map((reponse: Root<User> ) => {
        const user = reponse;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  register(model: register) {
    return this.http.post<any>(environment.baseUrl + 'auth/register', model).pipe(
      map((reponse: any) => {
        const user = reponse;
        // if (user) {
        //   this.setCurrentUser(user);
        // }
      })
    );
  }

  setCurrentUser(user: Root<User> ) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem(environment.userKey);
    this.currentUserSource.next(null);
  }
}
