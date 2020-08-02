import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../environments/environment';
import { UnifiedServiceService } from '../unified-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;

  errorMessage = "";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private user: UnifiedServiceService) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      pass: ['', Validators.required]
    });
  }


  loginState = false;

  ngOnInit(): void {
    this.user.currentLoginState.subscribe(state => this.loginState = state);
  }

  register() {
    this.errorMessage = "";
    var body = { email: this.registerForm.get("email").value, pass: this.registerForm.get("pass").value };
    console.log(body);
    this.http.post(environment.apiURL + "/register", body, { responseType: 'text' }).subscribe((data) => {
      console.log(data);
      this.errorMessage = data;
    }, (error) => {
      console.log(error);
      this.errorMessage = error.error;
    });
  }

}
