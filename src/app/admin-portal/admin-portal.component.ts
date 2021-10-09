import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-admin-portal',
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent implements OnInit {
  createJobForm:FormGroup;
  createTabShow:boolean=true;
  createSubscription:Subscription;
  getAllJobsSuscription:Subscription;
  getAllUsersSuscription:Subscription;
  createdjobListShow:boolean;
  createdJobLists:[];
  regJobLists=[];
  searchjob;
  searchUser;
  registeredUsers:boolean;
  constructor(private fb:FormBuilder,
    private adminService:AdminService,
    private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.createJobForm = this.fb.group({
      company_name:[''],
      description:[''],
      title:['']
    });
    this.getAllCreatedJobs();
    this.getAllRegisteredUsers();
  }

  getAllCreatedJobs =()=>{
    this.getAllJobsSuscription=this.adminService.getAllCreatedJobs().subscribe((res:any)=>{
      this.createdJobLists = res;
    })
  }

  getAllRegisteredUsers =()=>{
    this.getAllUsersSuscription=this.adminService.getAllRegisterUsers().subscribe((res:any)=>{
      this.regJobLists = res;
    })
  }
 // for tab switching
 switchTabs =(tabs:string)=>{
  switch (tabs) {
    case 'create':
       this.createTabShow = true;
       this.createdjobListShow = false;
       this.registeredUsers = false;
      break;
      case 'createdjobs':
        this.createTabShow = false;
        this.createdjobListShow = true;
        this.registeredUsers = false;
        break;
        case 'registeredUsers':
          this.createTabShow = false;
          this.createdjobListShow = false;
          this.registeredUsers = true;
          break;
    default:
      break;
  }

}

createjobs =()=>{
  this.createSubscription = this.adminService.createNewJob(this.createJobForm.value).subscribe((res:any)=>{
  if(res.status === true){
   this.toasterService.success(`${res.message}`);
   this.createJobForm.reset();
  }else{
    this.toasterService.error(`${res.message}`);
  }
  })
}

  //Use for any custom cleanup that needs to occur when the instance is destroyed.
  ngOnDestroy() {
    if (this.createSubscription)
      this.createSubscription.unsubscribe();
      if (this.getAllUsersSuscription)
      this.getAllUsersSuscription.unsubscribe();
      if (this.getAllJobsSuscription)
      this.getAllJobsSuscription.unsubscribe();
      
  }
}
