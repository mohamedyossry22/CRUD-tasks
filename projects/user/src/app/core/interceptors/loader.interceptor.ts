import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable , finalize } from 'rxjs';
import {  NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  counter = 0
  constructor(private spinner:NgxSpinnerService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.counter++
    this.spinner.show()
    return next.handle(request).pipe(finalize (() => {
      this.counter--
     if(this.counter == 0)  this.spinner.hide()
    }))
  }
}
