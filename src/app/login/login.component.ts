import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  authSubscription: Subscription;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toasterService:ToastrService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.inIntForm();
  }
  inIntForm() {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  isValid(controlName){
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;

  }
  get f() { return this.loginForm.controls; }

  submitHandler() {
    if (this.loginForm.status === "INVALID") {
      return this.submitted = true;
    } else { 
      this.authSubscription = this.authenticationService.login(this.loginForm.value.email ,this.loginForm.value.password)
        .subscribe((response: any) =>{
          if(response.status === true){
            this.toasterService.success(`${response.msg}`);
            localStorage.setItem('token',response.token);
            this.router.navigateByUrl('dashBoard');
          }else{
            this.toasterService.error("Please try again few minutes later,response is incomplete");
          }
      
        },
        (httpErrorResponse) => {
          console.log(httpErrorResponse);
          
        })
     
    }

  }
  ngOnDestroy() {
    if (this.authSubscription)
      this.authSubscription.unsubscribe();
  }
}
