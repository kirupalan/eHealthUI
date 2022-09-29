import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private _http: HttpClient, private router:Router) { }


  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      fund: ['0'],
      type: ['User'],
      status: ['Active']
    });
  }

  onSignUp(){
    if(this.signUpForm.valid)
    {
        this.auth.signUp(this.signUpForm.getRawValue())
        .subscribe
        ({
          next:(res)=>
          {
            console.log(res);
            //this.loginForm.reset();
            this.router.navigate(['login']);
          },
          error:(err)=>
          {
            alert(err?.error.message)
          }
        })
    }
    else
    {
        return;
    };
  }


}
