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
  public userDevices;
  public currentDevice = {
    device: "",
    id: "",
    data: ""
  }
  public id;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {
    this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.userDevices = localStorage.getItem('userDevices') ? JSON.parse(localStorage.getItem('userDevices')) : '';
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

  selectDevice(device: string, data: string) {
    this.userDevices.forEach(element => { if(element.name == device){ this.id = element.id; }
    this.currentDevice.device = device;
    this.currentDevice.data = data;
    this.currentDevice.id = this.id;
    localStorage.setItem('currentDevice', JSON.stringify(this.currentDevice));
  });
}
}