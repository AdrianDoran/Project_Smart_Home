import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public currentUser;
  // Need to make a get request to the api to receive device data.
  public userDevices;
  constructor(
    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService : AuthenticationService,
      private toastr: ToastrService
  ) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.userDevices = localStorage.getItem('userDevices')? JSON.parse(localStorage.getItem('userDevices')) : '';
   }

  ngOnInit() {
    this.authenticationService.getDevices(this.currentUser.email)
       .subscribe(
           data => {
            this.toastr.success("Devices retrieved.");
           },
           error => {
             this.toastr.info("You don't have any devices added.");
           });
  }
}


