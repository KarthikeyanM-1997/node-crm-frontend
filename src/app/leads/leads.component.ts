import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UnifiedServiceService } from '../unified-service.service';
import { getLocaleDayNames } from '@angular/common';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  constructor(private http: HttpClient, private user: UnifiedServiceService, private modalService: NgbModal) { }

  open(i) {
    const modalRef = this.modalService.open(ModalComponent);
    let data = [];
    data["Name"] = this.leadNames[i];
    data["Note"] = this.leadNotes[i];
    data["Status"] = this.leadStatuses[i];
    modalRef.componentInstance.data = data;

    modalRef.componentInstance.passEntry.subscribe((data) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'authorization': this.user.getToken()
        })
      };

      if (data.Note !== this.leadNotes[i] || data.Status !== this.leadStatuses[i]) {
        let body = { leadName: data["Name"], leadStatus: data["Status"], leadNotes: data["Note"] }

        this.http.post(environment.apiURL + "/updateLead", body, httpOptions).subscribe((data2: any[]) => {
          console.log(data2);
          this.leadNotes[i] = data["Note"];
          this.leadStatuses[i] = data["Status"];
        }, (error) => {
          console.log(error);
        });
      }


    })
  }

  ngOnInit(): void {
    let permissions = this.user.getPermissions();

    if (permissions.Leads === "Self") {
      this.showOnlyOwnLeads = true;
    }
    else {
      this.showOnlyOwnLeads = false;
      this.getAssignedEmployees();
    }

  }
  //tManager@gmail.com pass : t


  assignedEmployees = [];


  showOnlyOwnLeads = true;

  selectedEmployee = "";

  newLeadName = "";

  newLeadNotes = "";

  showLeads() {
    if (this.showOnlyOwnLeads) {
      this.getOwnLeads();
    }
    else {
      this.getEmployeeLeads();
    }
  }

  getEmployeeLeads() {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.user.getToken()
      })
    };

    this.leadNames = [];
    this.leadNotes = [];
    this.leadStatuses = [];

    this.http.post(environment.apiURL + "/viewEmployeeLead", { "employeeEmail": this.selectedEmployee }, httpOptions).subscribe((data: any[]) => {

      for (let i = 0; i < data.length; i++) {
        this.leadNames.push(data[i].Name);
        this.leadNotes.push(data[i].Notes);
        this.leadStatuses.push(data[i].Status);
      }

    }, (error) => {
      console.log(error);
    });
  }


  leadNames = [];
  leadNotes = [];
  leadStatuses = [];

  leadMessage: string = "";

  getOwnLeads() {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.user.getToken()
      })
    };

    this.http.get(environment.apiURL + "/viewLead", httpOptions).subscribe((data: any[]) => {

      this.leadNames = [];
      this.leadNotes = [];
      this.leadStatuses = [];

      for (let i = 0; i < data.length; i++) {
        this.leadNames.push(data[i].Name);
        this.leadNotes.push(data[i].Notes);
        this.leadStatuses.push(data[i].Status);
      }

    }, (error) => {
      console.log(error);
    });
  }

  createLead() {

    this.leadMessage = "";

    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.user.getToken()
      })
    };

    let body = { leadName: this.newLeadName, leadNotes: this.newLeadNotes };

    this.http.post(environment.apiURL + "/createNewLead", body, httpOptions).subscribe((data) => {
      if (data['message'] === "Lead Added") {
        console.log("Lead Created");
        this.leadNames.push(this.newLeadName);
        this.leadNotes.push(this.newLeadNotes);
        this.leadStatuses.push("New");
        this.newLeadName = "";
        this.newLeadNotes = "";
      }
    }, (error) => {
      this.leadMessage = "Lead name already present."
    });
  }

  getAssignedEmployees() {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': this.user.getToken()
      })
    };

    this.http.get(environment.apiURL + "/managedEmployees", httpOptions).subscribe((data: any[]) => {
      console.log(data);

      for (let i = 0; i < Object.keys(data).length; i++) {
        this.assignedEmployees.push(data[i]);
      }
      console.log(this.assignedEmployees);
    }, (error) => {
      console.log(error);
    });
  }


}
