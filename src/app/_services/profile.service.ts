import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class ProfileService {
    url= "http://localhost:3000";
  

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    public profileSave(payload) {
        return this.http.post(`${this.url}/profile/save`,payload);
     
    }
    
  
}