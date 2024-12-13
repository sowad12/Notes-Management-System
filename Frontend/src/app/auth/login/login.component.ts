import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup=new FormGroup({});
  submitted = false;
  errorMsg: Array<string> = [];
  user:any|null=null;
  constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private formBuilder: FormBuilder
  ) {

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('dashboard');  
      }
    });          
  }
  ngOnInit(): void {
    this.loginFormInitilaze();
}
@Output()
  cancelLogin=new EventEmitter<boolean>();

  loginFormInitilaze(){
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(15)]],
    })
  
  }
  login(){
    this.submitted = true;
    this.errorMsg = [];
    if(this.loginForm.valid){
     this.authService.login(this.loginForm.value).subscribe(
      (reponse)=>{
        this.toastr.success("Login success",'success',{
          timeOut: 3000
        });
        setTimeout(() => {
          this.router.navigateByUrl('dashboard');   
        }, 3000); 
        
      }
      )    
    }
  }
  cancel(){
    location.reload();
  }
}
