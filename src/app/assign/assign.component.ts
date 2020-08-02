import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UnifiedServiceService } from '../unified-service.service';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})

export class AssignComponent implements OnInit {

  constructor(private http: HttpClient, private user: UnifiedServiceService) { }

  unassignedEmployees: any = [];

  managers: any = [];

  selectedManager = "";

  selectedManager2 = "";
  selectedEmployee2 = "";

  plainData = {};

  assignAsManager() {
    console.log(this.selectedManager);

    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.user.getToken()
      })
    };

    let body = { email: this.selectedManager };

    this.http.post(environment.apiURL + "/assignAsManager", body, httpOptions).subscribe((data) => {
      if (data['response'] === "Account set as Manager") {
        this.unassignedEmployees.splice(this.unassignedEmployees.indexOf(this.selectedManager), 1);
        this.managers.push(this.selectedManager);
      }
    }, (error) => {
      console.log(error);
    });
  }

  displayStuff(){
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.user.getToken()
      })
    };
    
    this.http.get(environment.apiURL + "/listAllRelations", httpOptions).subscribe((data) => {
      console.log(data);
      this.plainData = data;
    }, (error) => {
      console.log(error);
    });
  }

  assignRelation() {
    console.log(this.selectedManager2 + " : " + this.selectedEmployee2);

    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.user.getToken()
      })
    };

    let body = { employeeMail: this.selectedEmployee2, managerMail: this.selectedManager2 };

    this.http.post(environment.apiURL + "/assignEmpToManager", body, httpOptions).subscribe((data) => {
      if (data['response'] === "Employee assigned to Manager.") {
        this.unassignedEmployees.splice(this.unassignedEmployees.indexOf(this.selectedEmployee2), 1);
      }
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {

    console.log(this.user.getToken());

    const httpOptions = {
      headers: new HttpHeaders({
        'responseType': 'application/json',
        'authorization': this.user.getToken()
      })
    };

    this.http.get(environment.apiURL + "/listAllUsers", httpOptions).subscribe((data) => {
      console.log(data);
      this.unassignedEmployees = data['Unassigned'];

      this.managers = data['Managers'];

    }, (error) => {
      console.log(error);
    });

  }

}
