import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { environment } from 'src/environments/environment.development';
import { User } from './_models/auth/user';
import { Root } from './_models/root';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  constructor(
    public authService: AuthService
  ){}
  ngOnInit(){
    this.setCurrentUser();

    }
    setCurrentUser() {
      const userJson = localStorage.getItem(environment.userKey);
      const user: Root<User>  = userJson ? JSON.parse(userJson) : null;
      this.authService.setCurrentUser(user);
    }
  }
    
