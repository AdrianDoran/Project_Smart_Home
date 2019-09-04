import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-adddevice',
  templateUrl: './add.device.component.html'
})
export class AddDeviceComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  deviceForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
    this.deviceForm = this.formBuilder.group({
      deviceName: ['', Validators.required],
      deviceType: ['', Validators.required],
      id: ['', Validators.required]
  });
  }

  get fval() { return this.deviceForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    // return for here if form is invalid
    if (this.deviceForm.invalid) {
      return;
    }

    // CODE to add device to database.
    

  }

}
