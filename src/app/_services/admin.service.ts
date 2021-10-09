import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Register} from '../_models/register';

@Injectable({ providedIn: 'root' })
export class AdminService {
    url= "http://localhost:3000";
  

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
       
    }
    public createNewJob(payload) {
        return this.http.post(`${this.url}/admin/savejob`,payload);
     
    }
    public getAllCreatedJobs() {
        return this.http.get(`${this.url}/admin/getAlljobs`);
     
    }

    public getAllRegisterUsers() {
        return this.http.get(`${this.url}/user/getAllRegisterUsers`);
     
    }
    


  
}