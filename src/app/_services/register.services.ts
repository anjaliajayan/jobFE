import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Register} from '../_models/register';

@Injectable({ providedIn: 'root' })
export class RegisterService {
    url= "http://localhost:3000";
  

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
       
    }
    public register(payload) {
        return this.http.post(`${this.url}/users/register`,payload);
     
    }
    


  
}