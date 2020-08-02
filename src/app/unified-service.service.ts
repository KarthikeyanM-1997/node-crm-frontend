import { Injectable } from '@angular/core';
import { Subject, animationFrameScheduler, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnifiedServiceService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  
  currentLoginState = this.loggedIn.asObservable();

  private token = new BehaviorSubject<string>("");

  private permissionsObject = new BehaviorSubject<any>({});

  private availableTabs = new BehaviorSubject<any>({});

  constructor() {

  }

  setPermissions(obj) {
    this.permissionsObject.next(obj);
  }

  getPermissions() {
    return this.permissionsObject.value;
  }

  setLogInState(state) {
    this.loggedIn.next(state);
  }

  setToken(jwt) {
    this.token.next(jwt);
  }

  getToken() {
    return this.token.value;
  }

}
