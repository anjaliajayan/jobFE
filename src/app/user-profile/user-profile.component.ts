import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as jobList from '../../assets/dataFiles/jobList.json';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  
})
export class UserProfileComponent implements OnInit {
  usersProfileForm:FormGroup;
  jobSearchForm:FormGroup;
  profiletabShow:boolean=true;
  jobSearchTab:boolean;
  appliedJob:boolean;
  jobLists=[];
  searchText;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.jobLists=jobList.default;
  
    this.inItForm();
    this.initJobSearchForm();
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
  initJobSearchForm (){
    this.jobSearchForm = this.fb.group({
     jobKeyWord:[''] ,
     jobField:['IT']
    })
  }
  saveProfile =()=>{
    console.log(this.usersProfileForm.value);
    
  }

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

  searchJobs =() =>{
    console.log(this.jobSearchForm.value);
    let tempjobField=this.jobSearchForm.value.jobField;
    console.log(tempjobField);
    switch (tempjobField) {
      case 'IT':
        this.jobLists=  [...this.jobLists.filter(e=> e.designation === 'Junior developer')];
      
        
        break;
        case 'Hospitality':
       
          break;
      default:
        break;
    }
  
  }
}
