import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public authService:AuthService){

  }
  ngOnInit(){
    this.getCurrentUser();

    }
    getCurrentUser(){
      this.authService.currentUser$.subscribe(res=>{

      },err=>{
        console.log(err);
        
      })
    }
}
