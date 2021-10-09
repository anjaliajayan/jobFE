import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterService } from '../_services/register.services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  registerSubscribtion:Subscription;
  constructor(private fb:FormBuilder,
    private registerService:RegisterService,
    private toasterService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.inItForm();
  }

  inItForm() {
    this.registerForm = this.fb.group({
      name: ['',Validators.required],
      email:['',[Validators.required, Validators.pattern('^[A-Za-z0-9._&%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,9}$')]],
      contact:[''],
      username :['',Validators.required],
      password:['',Validators.required],
      c_password:['',this.passWordValidator],
      gender:[''],
      role:['',Validators.required]
    });
    this.registerForm.controls.password.valueChanges.subscribe(x =>{
      this.registerForm.controls.c_password.updateValueAndValidity();
    })
  }

  isValid(controlName){
    return this.registerForm.get(controlName).invalid && this.registerForm.get(controlName).touched;

  }
  registerHandler =() =>{ 
    if(this.registerForm.invalid !== true){

    this.registerSubscribtion = this.registerService.register(this.registerForm.value).subscribe((res:any)=>{
     if(res.status === true){
      this.toasterService.success(`${res.msg}`);
       this.router.navigateByUrl('/login');
     }
    });
    }else{
      this.toasterService.warning(`Please enter mandatory fields`);
    }
   
  }

  passWordValidator(control:AbstractControl){
if(control && (control.value !== null) || (control.value !== undefined)){
  const c_password = control.value;
  const passControl = control.root.get('password');
  if(passControl){
    const passValue = passControl.value;
    if(passValue !== c_password || passValue === ''){
      return {
        isError :true
      };
    }
  }
}
return null;
  }

  ngOnDestroy(){
    if(this.registerSubscribtion)
       this.registerSubscribtion.unsubscribe();
  }
}
