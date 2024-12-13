import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFrom: FormGroup = new FormGroup({});
  submitted = false;
  errorMsg: Array<string> = [];
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
    this.FormInitilaze();
  }
  @Output()
  cancelRegister = new EventEmitter<boolean>();

  FormInitilaze() {
    this.registerFrom = this.formBuilder.group({
      name : ['',[Validators.required, Validators.minLength(5),Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(15)]],
      birthDate: ['', [Validators.required]]
      
    });
  }

  register() {
    this.submitted = true;
    this.errorMsg = [];
    if (this.registerFrom.valid) {
      this.authService.register(this.registerFrom.value).subscribe(
        (response) => {      
          this.toastr.success("Register success", 'success', {
            timeOut: 3000
          });
  
          setTimeout(() => {
            this.router.navigateByUrl('login');
          }, 3000); 
        },
       
      );
    }
    
  }
  cancel() {
      location.reload();
  }
}

