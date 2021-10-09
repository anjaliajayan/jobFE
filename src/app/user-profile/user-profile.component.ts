import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import * as jobList from '../../assets/dataFiles/jobList.json';
import { AdminService } from '../_services/admin.service';
import { ProfileService } from '../_services/profile.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent implements OnInit {
  usersProfileForm:FormGroup;
  profiletabShow:boolean=true;
  jobSearchTab:boolean;
  appliedJob:boolean;
  jobLists=[];
  searchText;
  loginedId: any;
  profileSubscription: Subscription;
  getAllJobsSuscription:Subscription;
  constructor(private fb:FormBuilder,
    private profileService :ProfileService,
    private toasterService:ToastrService,
    private adminService:AdminService) { }

  ngOnInit(): void {
  this.loginedId=JSON.parse(localStorage.getItem('user')).id;
    this.inItForm();
    this.getAllCreatedJobs();

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
      skills:[''],
      userId:this.loginedId
    });
  }

  getAllCreatedJobs =()=>{
    this.getAllJobsSuscription=this.adminService.getAllCreatedJobs().subscribe((res:any)=>{
      this.jobLists = res;
    })
  }

  saveProfile =()=>{
    this.profileSubscription = this.profileService.profileSave(this.usersProfileForm.value).subscribe((res:any)=>{
      if(res.status === true){
       this.toasterService.success('Profile Saved successfully');
      }else{
        this.toasterService.error('Please try again later');
      }
    })
    
  }

  // for tab switching
  switchTabs =(tabs:string)=>{
    switch (tabs) {
      case 'profile':
         this.profiletabShow = true;
         this.appliedJob= false;
         this.jobSearchTab = false;
        break;
        case 'search':
          this.profiletabShow = false;
          this.appliedJob= false;
          this.jobSearchTab = true;
          break;
          case 'applied':
          this.profiletabShow = false;
          this.jobSearchTab = false;
          this.appliedJob= true;
            break;
      default:
        break;
    }

  }

  //Use for any custom cleanup that needs to occur when the instance is destroyed.
  ngOnDestroy() {
    if (this.profileSubscription)
      this.profileSubscription.unsubscribe();
  }
}
