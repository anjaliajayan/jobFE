import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usersProfileForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.inItForm();
  }
  inItForm(){
    this.usersProfileForm =this.fb.group({
      jobTitle:['Choose...'],
      company:[''],
      industry:['Choose...'],
      country:[''],
      highlevel:[''],
      university:[''],
      dateComplete:[''],
      nationality:[''],
      skills:['']
    });
  }
  saveProfile =()=>{
    console.log(this.usersProfileForm.value);
    
  }
}
