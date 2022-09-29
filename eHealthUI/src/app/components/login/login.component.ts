import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private _http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(){
    if(this.loginForm.valid)
    {
        this.auth.login(this.loginForm.getRawValue())
        .subscribe
        ({
          next:(res)=>
          {
            console.log(res);
            //this.loginForm.reset();
            this.router.navigate(['medicines']);
          },
          error:(err)=>
          {
            console.log("Inside Error");
            console.log(err);
          }
        })
    }
    else
    {
        return;
    }
  }
}
