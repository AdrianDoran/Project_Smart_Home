import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public currentUser;
  // Need to make a get request to the api to receive device data.
  private userDevice;
  constructor() {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
   }

  ngOnInit() {

  }

}
