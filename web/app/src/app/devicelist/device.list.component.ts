import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../_services/device.service';
@Component({
    selector: 'app-devicelist',
    templateUrl: './device.list.component.html'
})
export class DeviceListComponent implements OnInit {
    public userDevices;
    public currentUser; // Possibly display we are still logged?
    constructor(
        private router: Router,
        private deviceService: DeviceService,
        private toastr: ToastrService
    ) {
        // Possibly use the stored device we want instead of using the whole set of devices.
        this.userDevices = localStorage.getItem('userDevices') ? JSON.parse(localStorage.getItem('userDevices')) : '';
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    }

    ngOnInit() {
        // toastr service that brings in the information of that device
    }
}