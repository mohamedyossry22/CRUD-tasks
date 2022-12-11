import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login, LoginResponse } from '../../context/DTOs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb:FormBuilder ,
    private service:LoginService , 
    private toaster:ToastrService,
    private router:Router
    ) { }

  loginForm!:FormGroup
  ngOnInit(): void {
    this.createForm()
  }


  createForm() {
    this.loginForm = this.fb.group({
      email:['' , [Validators.required , Validators.email] ],
      password:['' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
      role:['admin']
    })
  }

  login() {
    this.service.login(this.loginForm.value).subscribe((res:any) =>{
      localStorage.setItem("token" , res.token)
      this.toaster.success("Success" , "Login Success")
      this.router.navigate(['/tasks'])
    })
  }
}
