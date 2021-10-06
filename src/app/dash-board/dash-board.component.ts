import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  logoutSubscription:Subscription;
  constructor(private router:Router,
    private authService:AuthenticationService,
    private loginService:LoginService) { }

  ngOnInit(): void {
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
