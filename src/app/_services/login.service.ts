import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class LoginService {
    url= "http://localhost:3000";
  

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    login(payload:any){
        
        return this.http.post(`${this.url}/users/login`,payload);
    }
    logout() {
        return this.http.post(`${this.url}/api/logout`,"logout");
     
    }

    


  
}