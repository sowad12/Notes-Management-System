import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const  router = inject(Router);
  return authService.currentUser$.pipe(
    map(user => {
      if (user) {
        return true;
      } else {      
        toastr.error("please login first!");
        router.navigate(['/login']);     
        return false;
      }
    })
  );
};
