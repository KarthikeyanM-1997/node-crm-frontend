import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnifiedServiceService } from '../unified-service.service';

import { environment } from './../../environments/environment';

import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private user: UnifiedServiceService) {

  }

  availableTabs : any = [];

  showAssignTab = false;

  showLeadsTab = false;

  ngOnInit(): void {

    console.log(this.user.getToken());

    const httpOptions = {
      headers: new HttpHeaders({
        'responseType': 'application/json',
        'authorization': this.user.getToken()
      })
    };

    this.http.get(environment.apiURL + "/availableTabs", httpOptions).subscribe((data) => {
      console.log("perm data");
      console.log(data);
      this.user.setPermissions(data);

      this.availableTabs = Object.keys(data);

      this.showAssignTab = this.availableTabs.includes("Assign");

      this.showLeadsTab = this.availableTabs.includes("Leads");

    }, (error) => {
      console.log(error);
    });

  }

}
