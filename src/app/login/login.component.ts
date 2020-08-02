import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { UnifiedServiceService } from '../unified-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private user: UnifiedServiceService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      pass: ['', Validators.required]
    });
  }

  loginState: boolean;

  ngOnInit(): void {
    this.user.currentLoginState.subscribe(state => this.loginState = state);
  }

  login() {
    this.errorMessage = "";
    var body = { email: this.loginForm.get("email").value, pass: this.loginForm.get("pass").value };
    console.log(body);
    this.http.post(environment.apiURL + "/login", body, { responseType: 'json' }).subscribe((data) => {
      //data = JSON.parse(data);
      if(data['message'] === "Valid login"){
        this.errorMessage = "Successful Login";
        this.user.setLogInState(true);
        this.user.setToken(data["token"]);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.errorMessage = data["message"];
      }
      
    }, (error) => {
      console.log(error);
      this.errorMessage = error.error;
    });
  }
}
