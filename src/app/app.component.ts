import { Component, OnInit } from '@angular/core';
import { UnifiedServiceService } from './unified-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularPassword';

  loginState = false;

  constructor(private user: UnifiedServiceService) {

  }

  ngOnInit(): void {
    this.user.currentLoginState.subscribe(state => this.loginState = state);
  }
  
}
