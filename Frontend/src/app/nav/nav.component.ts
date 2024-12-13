import { Component,OnInit } from '@angular/core';
import { AuthService} from '../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public authService: AuthService,private router:Router,private toastr: ToastrService) {}
  ngOnInit(){
   this.getCurrentUser();

   }

   logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
 
  }
  getCurrentUser(){
    this.authService.currentUser$.subscribe(res=>{
    
    },err=>{
      console.log(err);
      
    })
  }
}
