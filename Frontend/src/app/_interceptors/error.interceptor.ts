import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          console.log("error",error)
          //for customException
          if (error.status!=500 && error.error?.Status?.Message) {
            this.toastr.error(error.error.Status.Message, `${error.status}`);
          }
          else{
            switch (error.status) {
              case 400:              
                  if (error.error.errors) {
                    const modelStateErrors = [];
                    for (const key in error.error.errors) {
                      if (error.error.errors[key]) {
                        modelStateErrors.push(error.error.errors[key])
                      }
                    }
                    this.toastr.error('Bad request', `${error.status}`);
                    throw modelStateErrors.flat();
                  } else {
                    this.toastr.error(error.error, `${error.status}`);
                  }               
                break;
              case 401:
                this.toastr.error('Unauthorized', `${error.status}`);
                break;
              case 404:             
                this.toastr.error('Not found', `${error.status}`);               
                this.router.navigate(['/not-found']);
                break;
              case 500:               
                this.toastr.error('Internal server error', `${error.status}`);               
                break;
              default:
                this.toastr.error('Something unexpected went wrong');
                break;
            }
          }
      
        }
        // Ensure the error is propagated
        return throwError(() => error);
      })
    );
  }
}
