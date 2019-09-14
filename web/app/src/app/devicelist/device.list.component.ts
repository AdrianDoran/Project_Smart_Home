import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceDataService } from '../_services/device.data.service';
@Component({
    selector: 'app-devicelist',
    templateUrl: './device.list.component.html'
})
export class DeviceListComponent implements OnInit {
    public userDevices;
    public currentUser; // Possibly display we are still logged?
    public currentDevice;
    public deviceID;
    public deviceType;
    public deviceDataLog;
    
    constructor(
        private router: Router,
        private deviceService: DeviceDataService,
        private toastr: ToastrService,
        private deviceData: DeviceDataService
    ) {
        // Possibly use the stored device we want instead of using the whole set of devices.
        this.userDevices = JSON.parse(localStorage.getItem('userDevices'));
        this.currentUser =  JSON.parse(localStorage.getItem('currentUser'));
        this.currentDevice = JSON.parse(localStorage.getItem('currentDevice'));
    }

    ngOnInit() {

        this.deviceService.getData(this.currentDevice)
        .subscribe(
          data => {
            this.toastr.success("Data retreived.");
            // Work with data here.
            this.deviceDataLog = data;
          },
          error => {
            this.toastr.info("Couldn't get device data.");
          });
          var Plotly = require('plotly.js/dist/plotly.js')("benhodgson", "zoIPhYNR1Phltwtx48Sp");
          var mapbox; 

    }
}