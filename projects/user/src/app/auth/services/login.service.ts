import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { CreateAccount, Login } from '../constant/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  createUser(model:CreateAccount) {
    return this.http.post(environment.baseApi.replace('/tasks' , '/auth') + '/createAccount' , model)
  }

  login(model:Login) {
    return this.http.post(environment.baseApi.replace('/tasks' , '/auth') + '/login' , model)
  }
}
