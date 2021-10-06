import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    url = "http://localhost:3000";
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
  constructor(private http : HttpClient,private router: Router,) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userInfo')));
    this.user = this.userSubject.asObservable();
   }

   public get userValue(): User {
    return this.userSubject.value;
}

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public setUserInfo(user){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(username, password) {
    // return this.http.post(`${this.url}/api/login`,
    //  {'userName' :username, 'passWord' : password},{withCredentials:true});

    return this.http.post<any>(`${this.url}/users/login`, {'userName' :username, 'passWord' : password},{withCredentials:true})
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
}
}