import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DeviceService } from '../_services/device.data.service';
@Component({
    selector: 'app-devicelist',
    templateUrl: './device.list.component.html'
})
export class DeviceListComponent implements OnInit {
    public userDevices;
    public currentUser; // Possibly display we are still logged?
    public currentDevice;
    public deviceID;
    constructor(
        private router: Router,
        private deviceService: DeviceService,
        private toastr: ToastrService,
        private deviceData: DeviceService
    ) {
        // Possibly use the stored device we want instead of using the whole set of devices.
        this.userDevices = JSON.parse(localStorage.getItem('userDevices'));
        this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        this.currentDevice = localStorage.getItem('currentDevice');
        this.userDevices.forEach(element => { if(element.name == this.currentDevice){ this.deviceID = element.id; }
            
        });
    }

    ngOnInit() {
        
        this.deviceService.retrieve(this.deviceID)
        .subscribe(
          data => {
            this.toastr.success("Data retreived.");
            // Work with data here.
          },
          error => {
            this.toastr.info("Couldn't get device data.");
          });
    }
}