import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from '../_services/device.service';
@Component({
  selector: 'app-addcard',
  templateUrl: './add.card.component.html'
})
export class AddCardComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private deviceService: DeviceService,
    private toastr: ToastrService
  ) { }
  cardForm: FormGroup;
  loading = false;
  submitted = false;
  currentDevice = JSON.parse(localStorage.getItem('currentDevice'))
  currentDeviceID = this.currentDevice.id;

  ngOnInit() {
    this.cardForm = this.formBuilder.group({
      deviceID: [this.currentDeviceID],
      cardName: ['', Validators.required],
      id: ['', Validators.required]
  });
  }

  get fval() { return this.cardForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    // return for here if form is invalid
    if (this.cardForm.invalid) {
      return;
    }
    this.loading = true;
    this.deviceService.setCard(this.cardForm.value).subscribe(
      (data)=>{
        this.toastr.success("Card registered!")
        localStorage.setItem('currentCards', JSON.stringify(data));
        this.router.navigate(['/']);
     },
      (error)=>{
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    )
  }
}
