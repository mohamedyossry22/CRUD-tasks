import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    {
      useClass:LoaderInterceptor,
      provide:HTTP_INTERCEPTORS,
      multi:true
    },
    {
      useClass:ErrorInterceptor,
      provide:HTTP_INTERCEPTORS,
      multi:true
    },
     {
      useClass:AuthInterceptor,
      provide:HTTP_INTERCEPTORS,
      multi:true
    },
  ]
})
export class CoreModule { }
