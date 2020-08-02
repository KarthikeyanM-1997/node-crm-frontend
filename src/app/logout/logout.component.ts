import { Component, OnInit } from '@angular/core';
import { UnifiedServiceService } from '../unified-service.service';

import {Router} from "@angular/router"


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})


export class LogoutComponent implements OnInit {

  constructor(private user : UnifiedServiceService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.user.setLogInState(false);
    this.router.navigate(['/login'])
  }
}
