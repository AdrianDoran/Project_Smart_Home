import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../_services/device.service';
@Component({
  selector: 'app-adddevice',
  templateUrl: './add.device.component.html'
})
export class AddDeviceComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private deviceService: DeviceService,
    private toastr: ToastrService
  ) { }
  deviceForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  userEmail = this.currentUser.email;

  ngOnInit() {
    this.deviceForm = this.formBuilder.group({
      email: [this.userEmail],
      name: ['', Validators.required],
      type: ['', Validators.required],
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
    this.loading = true;
    this.deviceService.register(this.deviceForm.value).subscribe(
      (data)=>{
        this.toastr.success("Device Registered!")
        this.router.navigate(['/']);
     },
      (error)=>{
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    )
  }
}
