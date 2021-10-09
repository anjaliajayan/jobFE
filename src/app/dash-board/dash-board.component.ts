import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  logoutSubscription:Subscription;
  loginedRole: any;
  constructor(private router:Router,
    private authService:AuthenticationService) { }

  ngOnInit(): void {
    this.loginedRole=JSON.parse(localStorage.getItem('user')).role;
    
  }

  logout =()=>{
    this.authService.logout();
  }
  
  togglemenu =()=>{
    var menuList = document.getElementById('menu-list');
    menuList.style.maxHeight ='0px';
    function togglemenu(){
        if(menuList.style.maxHeight =='0px'){
            menuList.style.maxHeight ='130px';
        }else{
            menuList.style.maxHeight ='0px';
        }

    }
  }
}
