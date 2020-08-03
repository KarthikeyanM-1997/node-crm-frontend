import { Component, OnInit } from '@angular/core';
import { UnifiedServiceService } from './unified-service.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularPassword';

  loginState = false;

  constructor(private user: UnifiedServiceService, private titleService: Title) {
    this.setTitle("Simple CRM Tool");
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  ngOnInit(): void {
    this.user.currentLoginState.subscribe(state => this.loginState = state);
  }
  
}
